package com.backend.product.service.customer;

import java.util.List;

import com.backend.product.DTO.CustomerProductResponse;

public interface CustomerProductService {

    // Get all active products (include stock=0)
    List<CustomerProductResponse> getAllProducts();

    // Get single active product by ID
    CustomerProductResponse getProductById(Long productId);

    // Get products by category (active only)
    List<CustomerProductResponse> getProductsByCategory(Long categoryId);

    // Get products by brand (active only)
    List<CustomerProductResponse> getProductsByBrand(String brand);

    // Get all brands (from active products only)
    List<String> getAllBrands();

    // Get brands per category (from active products only)
    List<String> getBrandsByCategory(Long categoryId);
}
