package com.backend.cart.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDTO {
	
    private Long cartItemId;
    private Long productId;
    private String productName;
    private String imageUrl;
    private int quantity;
    private BigDecimal  price;
    private BigDecimal  totalPrice;
}
