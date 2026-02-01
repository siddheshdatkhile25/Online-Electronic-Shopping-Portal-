package com.backend.product.service.admin;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.backend.product.DTO.ProductRequest;
import com.backend.product.DTO.ProductResponse;
import com.backend.product.entity.Product;

public interface ProductService {
 
	ProductResponse createProduct(ProductRequest request) ;
	
	List<ProductResponse> getAllProducts();

	ProductResponse getProductById(Long productId);

	ProductResponse updateProduct(Long productId, ProductRequest request);

	void deleteProduct(Long productId);

	ProductResponse toggleProductStatus(Long productId);

	ProductResponse addProductStock(Long productId, Integer quantity);

}