package com.backend.order.DTO;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminOrderItemResponse {

    private Long productId;
    private String productName;
    private Integer quantity;
    private BigDecimal price;        // price per unit
    private BigDecimal totalAmount;  // price * quantity
    
}
