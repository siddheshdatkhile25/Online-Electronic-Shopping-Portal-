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

    // Create Product
    @Override
    public ProductResponse createProduct(ProductRequest request) {

        if (request.getImage() == null || request.getImage().isEmpty()) {
            throw new RuntimeException("Product image is required");
        }

        Category category = categoryRepository.findById(request.getCategoryId())
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
                .active(request.getStock() > 0)   // 👈 Available only if stock > 0
                .build();

        applyDiscount(product, request.getDiscountPercentage());

        return convertToResponse(productRepository.save(product));
    }

    // Convert Product entity to ProductResponse DTO
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

    // Get all active products
    @Override
    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .toList();
    }

    // Get product by ID
    @Override
    public ProductResponse getProductById(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        return convertToResponse(product);
    }

    @Override
    public ProductResponse updateProduct(Long productId, ProductRequest request) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        // Update basic fields if provided
        if (request.getName() != null) product.setName(request.getName());
        if (request.getDescription() != null) product.setDescription(request.getDescription());
        if (request.getPrice() != null) product.setPrice(request.getPrice());
        if (request.getBrand() != null) product.setBrand(request.getBrand());

        // Update category if provided
        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
            product.setCategory(category);
        }

        // Update stock safely
        if (request.getStock() != null) {
            product.setStock(request.getStock());

            // Only deactivate if stock is 0
            if (product.getStock() <= 0 && product.getActive()) {
                product.setActive(false);
            }

            // Reactivate if stock > 0 
            if (product.getStock() > 0 && !product.getActive()) {
                product.setActive(true);
            }
        }

        // Update image if provided
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

        // Save and return updated product
        Product updated = productRepository.save(product);
        return convertToResponse(updated);
    }


    // Soft delete product
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

    // Discount calculator
    private void applyDiscount(Product product, Double discountPercentage) {

        BigDecimal price = product.getPrice();

        if (discountPercentage != null && discountPercentage > 0) {

            BigDecimal discount = price
                    .multiply(BigDecimal.valueOf(discountPercentage))
                    .divide(BigDecimal.valueOf(100));

            BigDecimal discountedPrice = price.subtract(discount);

            product.setDiscountPercentage(discountPercentage);
            product.setDiscountedPrice(discountedPrice);

        } else {
            product.setDiscountPercentage(null);
            product.setDiscountedPrice(price);
        }
    }

    // Toggle product status
    @Override
    public ProductResponse toggleProductStatus(Long productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        product.setActive(!product.getActive());

        return convertToResponse(productRepository.save(product));
    }

    // Admin Add Stock
    @Override
    public ProductResponse addProductStock(Long productId, Integer quantity) {

        if (quantity == null || quantity <= 0) {
            throw new RuntimeException("Quantity must be greater than 0");
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        product.setStock(product.getStock() + quantity);

        //  If stock increased above 0, make product active again
        if (product.getStock() > 0) {
            product.setActive(true);
        }

        return convertToResponse(productRepository.save(product));
    }
}
