package com.backend.wishlist.dto;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class WishlistProductDTO {

    private Long productId;
    private String name;
    private BigDecimal price;

    // ✅ primary product image
    private String imageUrl;
}
