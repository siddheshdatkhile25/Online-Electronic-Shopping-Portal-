package com.backend.product.service.admin;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.category.entity.Category;
import com.backend.category.repository.CategoryRepository;
import com.backend.common.exception.ResourceNotFoundException;
import com.backend.common.service.FileUploadService;
import com.backend.product.DTO.ProductRequest;
import com.backend.product.DTO.ProductResponse;
import com.backend.product.entity.Product;
import com.backend.product.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final FileUploadService fileUploadService;

    // ================= CREATE PRODUCT =================
    @Override
    public ProductResponse createProduct(ProductRequest request) {

        if (request.getImage() == null || request.getImage().isEmpty()) {
            throw new RuntimeException("Product image is required");
        }

        Category category = categoryRepository.findByIdAndActiveTrue(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        String url = fileUploadService.uploadFile(request.getImage(), "products");

        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .stock(request.getStock())
                .category(category)
                .brand(request.getBrand())
                .imgUrl(url)
                .active(request.getStock() > 0)   // active only if stock > 0
                .build();

        applyDiscount(product, request.getDiscountPercentage());

        return convertToResponse(productRepository.save(product));
    }

    // ================= CONVERTER =================
    private ProductResponse convertToResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .discountPercentage(product.getDiscountPercentage())
                .discountedPrice(product.getDiscountedPrice())
                .stock(product.getStock())
                .categoryId(product.getCategory().getId())
                .categoryName(product.getCategory().getName())
                .brand(product.getBrand())
                .imgUrl(product.getImgUrl())
                .active(product.getActive())
                .createdAt(product.getCreatedAt())
                .build();
    }

    // ================= GET ALL (ADMIN) =================
    @Override
    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // ================= GET BY ID =================
    @Override
    public ProductResponse getProductById(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        return convertToResponse(product);
    }

    // ================= UPDATE PRODUCT =================
    @Override
    public ProductResponse updateProduct(Long productId, ProductRequest request) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        if (request.getName() != null) product.setName(request.getName());
        if (request.getDescription() != null) product.setDescription(request.getDescription());
        if (request.getPrice() != null) product.setPrice(request.getPrice());
        if (request.getBrand() != null) product.setBrand(request.getBrand());

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findByIdAndActiveTrue(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
            product.setCategory(category);
        }

        // Update stock logic
        if (request.getStock() != null) {
            product.setStock(request.getStock());

            if (product.getStock() <= 0) {
                product.setActive(false);
            } else {
                product.setActive(true);
            }
        }

        // Update image
        if (request.getImage() != null && !request.getImage().isEmpty()) {
            if (product.getImgUrl() != null) {
                fileUploadService.deleteFile(product.getImgUrl());
            }
            String url = fileUploadService.uploadFile(request.getImage(), "products");
            product.setImgUrl(url);
        }

        // Update discount
        if (request.getDiscountPercentage() != null) {
            applyDiscount(product, request.getDiscountPercentage());
        }

        // 🔒 SAFETY: product cannot be active if category is inactive
        if (!product.getCategory().getActive()) {
            product.setActive(false);
        }

        return convertToResponse(productRepository.save(product));
    }

    // ================= SOFT DELETE PRODUCT =================
    @Override
    public void deleteProduct(Long productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product Not Found"));

        if (product.getImgUrl() != null) {
            fileUploadService.deleteFile(product.getImgUrl());
        }

        product.setActive(false);
        productRepository.save(product);
    }

    // ================= DISCOUNT =================
    private void applyDiscount(Product product, Double discountPercentage) {

        BigDecimal price = product.getPrice();

        if (discountPercentage != null && discountPercentage > 0) {

            BigDecimal discount = price
                    .multiply(BigDecimal.valueOf(discountPercentage))
                    .divide(BigDecimal.valueOf(100));

            product.setDiscountPercentage(discountPercentage);
            product.setDiscountedPrice(price.subtract(discount));

        } else {
            product.setDiscountPercentage(null);
            product.setDiscountedPrice(price);
        }
    }

  
    @Override
    public ProductResponse toggleProductStatus(Long productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        product.setActive(!product.getActive());

        // 🔒 Ensure category inactive → product inactive
        if (!product.getCategory().getActive()) {
            product.setActive(false);
        }

        return convertToResponse(productRepository.save(product));
    }

    
    @Override
    public ProductResponse addProductStock(Long productId, Integer quantity) {

        if (quantity == null || quantity <= 0) {
            throw new RuntimeException("Quantity must be greater than 0");
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        product.setStock(product.getStock() + quantity);

        if (product.getStock() > 0 && product.getCategory().getActive()) {
            product.setActive(true);
        }

        return convertToResponse(productRepository.save(product));
    }
}
