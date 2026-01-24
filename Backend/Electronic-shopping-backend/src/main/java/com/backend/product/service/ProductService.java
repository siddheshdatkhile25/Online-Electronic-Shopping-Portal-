package com.backend.product.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.backend.product.entity.Product;

public interface ProductService {
 
		Product createProduct(
			String name,
			String description,
			BigDecimal price,
			Integer Stock,
			Long categoryId,
			List<MultipartFile> images
		);
		
		List<Product> getAllProducts();
		
		Product getProductById(Long id);
		
		List<Product> getProductsByCategory(Long categoryId);
}
