package com.backend.product.DTO;

import java.math.BigDecimal;
import java.util.List;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class CustomerProductResponse {

    private Long id;
    private String name;
    private String description;

    private BigDecimal price;
    private Double discountPercentage;
    private BigDecimal discountedPrice;

    private String categoryName;
    private String brand;

    
    private String primaryImageUrl;
    private List<String> imageUrls;
}
