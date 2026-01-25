package com.backend.product.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
public class ProductResponse {

    private Long id;
    private String name;
    private String description;
    
    //Original Price
    private BigDecimal price;
    
    // Discount fields
    private Double discountPercentage;
    private BigDecimal discountedPrice;
    
    private Integer stock;

    private Long categoryId;
    private String categoryName;
    private String brand;
    private String imgUrl;
    private Boolean active;
    private LocalDateTime createdAt;
}
