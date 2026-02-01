package com.backend.product.DTO;


import java.math.BigDecimal;

import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class ProductRequest {
	private String name;
	
	private String description;
	
	private BigDecimal price;
	
	private Integer stock;
	
	private Long categoryId;
	
	//Product Discount
	private Double discountPercentage;

	private String brand;
	//MultipartFile is used to receive image files sent via multipart/form-data
	private MultipartFile image;
	
	// Used to add stock to an existing product without overwriting current stock
    private Integer addStock;
}
