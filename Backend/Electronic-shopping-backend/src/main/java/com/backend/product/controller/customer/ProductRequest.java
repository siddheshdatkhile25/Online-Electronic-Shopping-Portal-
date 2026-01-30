package com.backend.product.controller.customer;

import java.math.BigDecimal;
import java.util.List;

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

    // Product Discount (percentage)
    private Double discountPercentage;

    private String brand;

    // Multiple product images (max 4)
    private List<MultipartFile> images;

    // Used to add stock to an existing product without overwriting current stock
    private Integer addStock;
}
