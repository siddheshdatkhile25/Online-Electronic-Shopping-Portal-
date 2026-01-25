package com.backend.wishlist.dto;

import java.math.BigDecimal;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WishlistProductDTO {

    private Long id;
    private String name;
    private BigDecimal price;
    private String imgUrl;
}
