package com.backend.product.service.customer;

import java.util.List;

import com.backend.product.DTO.CustomerProductResponse;

public interface CustomerProductService {

	List<CustomerProductResponse> getAllActiveProducts();

	CustomerProductResponse getActiveProductById(Long productId);

	List<CustomerProductResponse> getProductsByCategory(Long categoryId);

	List<CustomerProductResponse> getProductsByBrand(String brand);

	List<String> getAllActiveBrands();

	List<String> getBrandsByCategory(Long categoryId);

}