package com.backend.product.service.admin;

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
                .active(true)
                .build();

        return convertToResponse(productRepository.save(product));
    }

    // Convert Product entity to ProductResponse DTO
    private ProductResponse convertToResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .stock(product.getStock())
                .categoryId(product.getCategory().getId())
                .categoryName(product.getCategory().getName())
                .imgUrl(product.getImgUrl())
                .active(product.getActive())
                .createdAt(product.getCreatedAt())
                .build();
    }

    // Get all active products
    @Override
    public List<ProductResponse> getAllProducts() {
        return productRepository.findByActiveTrue()
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

    // Update product
    @Override
    public ProductResponse updateProduct(Long productId, ProductRequest request) {

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        if (request.getName() != null) product.setName(request.getName());
        if (request.getDescription() != null) product.setDescription(request.getDescription());
        if (request.getPrice() != null) product.setPrice(request.getPrice());
        if (request.getStock() != null) product.setStock(request.getStock());

        // Update category if provided
        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
            product.setCategory(category);
        }

        // Update image if provided
        if (request.getImage() != null && !request.getImage().isEmpty()) {
            // Delete old image from S3
            if (product.getImgUrl() != null) {
                fileUploadService.deleteFile(product.getImgUrl());
            }

            // Upload new image
            String url = fileUploadService.uploadFile(request.getImage(), "products");
            product.setImgUrl(url);
        }

        Product updated = productRepository.save(product);
        return convertToResponse(updated);
    }

    // Soft delete product
    @Override
    public void deleteProduct(Long productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product Not Found"));

        //delete image from S3 when product is deleted
        if (product.getImgUrl() != null) {
            fileUploadService.deleteFile(product.getImgUrl());
        }

        product.setActive(false);
        productRepository.save(product);
    }


}
