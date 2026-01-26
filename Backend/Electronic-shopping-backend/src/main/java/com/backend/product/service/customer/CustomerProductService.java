package com.backend.product.service.customer;

import java.util.List;

import com.backend.product.DTO.CustomerProductResponse;

public interface CustomerProductService {


	CustomerProductResponse getActiveProductById(Long productId);

	List<CustomerProductResponse> getProductsByCategory(Long categoryId);

	List<CustomerProductResponse> getProductsByBrand(String brand);

	List<String> getBrandsByCategory(Long categoryId);

}
