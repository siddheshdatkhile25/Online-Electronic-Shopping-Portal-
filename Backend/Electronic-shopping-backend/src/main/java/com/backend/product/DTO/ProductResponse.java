package com.backend.product.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ProductResponse {

    private Long id;
    private String name;
    private String description;

    private BigDecimal price;
    private Double discountPercentage;
    private BigDecimal discountedPrice;

    private Integer stock;
    private String stockMessage;

    private Long categoryId;
    private String categoryName;

    private String brand;

    
    private List<String> imageUrls;

    private Boolean active;
    private LocalDateTime createdAt;
}
