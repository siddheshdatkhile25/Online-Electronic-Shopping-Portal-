package com.backend.product.service.admin;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.backend.category.entity.Category;
import com.backend.category.repository.CategoryRepository;
import com.backend.common.exception.ResourceNotFoundException;
import com.backend.common.service.FileUploadService;
import com.backend.product.DTO.ProductRequest;
import com.backend.product.DTO.ProductResponse;
import com.backend.product.entity.Product;
import com.backend.product.entity.ProductImage;
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

        List<MultipartFile> images = request.getImages();

        if (images == null || images.isEmpty()) {
            throw new RuntimeException("Product image is required");
        }

        if (images.size() > 4) {
            throw new RuntimeException("Maximum 4 images are allowed per product");
        }

        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .stock(request.getStock())
                .category(category)
                .brand(request.getBrand())
                .active(true) // update: product is active by default when created
                .build();

        // Apply discount
        applyDiscount(product, request.getDiscountPercentage());

        List<ProductImage> productImages = new ArrayList<>();

        for (int i = 0; i < images.size(); i++) {
            MultipartFile file = images.get(i);

            String url = fileUploadService.uploadFile(file, "products");

            ProductImage image = new ProductImage();
            image.setImageUrl(url);
            image.setIsPrimary(i == 0); // update: first image treated as primary
            image.setProduct(product);

            productImages.add(image);
        }

        product.setImages(productImages); // update: attach uploaded images to product

        return convertToResponse(productRepository.save(product));
    }

    // ================= CONVERTER =================
    private ProductResponse convertToResponse(Product product) {

        String stockMessage = null;
        if (product.getStock() != null && product.getStock() > 0 && product.getStock() <= 10) {
            stockMessage = "Only " + product.getStock() + " available";
        }

        List<String> imageUrls = product.getImages()
                .stream()
                .map(ProductImage::getImageUrl)
                .toList(); // update: map ProductImage entities to image URLs

        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .discountPercentage(product.getDiscountPercentage())
                .discountedPrice(product.getDiscountedPrice())
                .stock(product.getStock())
                .stockMessage(stockMessage)
                .categoryId(product.getCategory().getId())
                .categoryName(product.getCategory().getName())
                .brand(product.getBrand())
                .imageUrls(imageUrls)
                .active(product.getActive())
                .createdAt(product.getCreatedAt())
                .build();
    }

    // Get all products (ADMIN)
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

        // update: stock update also controls active status
        if (request.getStock() != null) {
            product.setStock(request.getStock());
            product.setActive(product.getStock() > 0);
        }

        // Update discount
        if (request.getDiscountPercentage() != null) {
            applyDiscount(product, request.getDiscountPercentage());
        }

        return convertToResponse(productRepository.save(product));
    }

    // Soft delete product
    @Override
    public void deleteProduct(Long productId) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product Not Found"));

        product.setActive(false); // update: soft delete by disabling product
        productRepository.save(product);
    }

    // Toggle product active/inactive status
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

    // Add stock to existing product
    @Override
    public ProductResponse addProductStock(Long productId, Integer quantity) {

        if (quantity == null || quantity <= 0) {
            throw new RuntimeException("Quantity must be greater than 0");
        }

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        product.setStock(product.getStock() + quantity);

        if (product.getStock() > 0) {
            product.setActive(true); // update: reactivate product when stock is added
        }

        return convertToResponse(productRepository.save(product));
    }

    // Accurate discount calculation
    private void applyDiscount(Product product, Double discountPercentage) {

        BigDecimal price = product.getPrice();

        if (discountPercentage != null && discountPercentage > 0) {

            BigDecimal discountPercent = BigDecimal
                    .valueOf(discountPercentage)
                    .setScale(2, RoundingMode.HALF_UP);

            BigDecimal discountAmount = price
                    .multiply(discountPercent)
                    .divide(BigDecimal.valueOf(100), 2, RoundingMode.HALF_UP);

            BigDecimal discountedPrice = price.subtract(discountAmount);

            product.setDiscountPercentage(discountPercentage);
            product.setDiscountedPrice(discountedPrice);

        } else {
            product.setDiscountPercentage(null);
            product.setDiscountedPrice(price);
        }
    }
}
