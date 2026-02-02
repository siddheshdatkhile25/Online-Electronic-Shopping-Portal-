package com.backend.product.service.admin;

import java.util.List;

import com.backend.product.DTO.ProductRequest;
import com.backend.product.DTO.ProductResponse;

public interface ProductService {

    // Create new product
    ProductResponse createProduct(ProductRequest request);

    // Get all active products (admin view)
    List<ProductResponse> getAllProducts();

    // Get product by ID
    ProductResponse getProductById(Long productId);

    // Update product details
    ProductResponse updateProduct(Long productId, ProductRequest request);

    // Soft delete product
    void deleteProduct(Long productId);

    // Toggle product active / inactive
    ProductResponse toggleProductStatus(Long productId);

    // Add stock to existing product
    ProductResponse addProductStock(Long productId, Integer quantity);
}
