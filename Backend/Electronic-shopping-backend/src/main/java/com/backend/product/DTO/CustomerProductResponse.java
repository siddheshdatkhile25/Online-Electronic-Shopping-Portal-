package com.backend.product.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CustomerProductResponse {

		private Long id;
	    private String name;
	    private String description;
	    private BigDecimal price;
	    private String categoryName;
	    private String brand;
	    private String imgUrl;
	    
	    
}
