package com.backend.product.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


// @Data is a Lombok annotation is a combination of multiple annotations like getter,setter,toString, equalsAndHashCode and requiredArgsConstructor
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductResponse {

    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Integer stock;
    private Boolean active;

    private Long categoryId;

    private List<String> imageUrls;

    private LocalDateTime createdAt;
}
