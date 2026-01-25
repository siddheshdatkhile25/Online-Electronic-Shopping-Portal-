package com.backend.wishlist.service;

import java.util.List;
import com.backend.wishlist.dto.WishlistProductDTO;

public interface WishlistService {

    void addProductToWishlist(Long userId, Long productId);

    void removeProductFromWishlist(Long userId, Long productId);

    List<WishlistProductDTO> getWishlistByUser(Long userId);
    
    void moveToCart(Long userId, Long productId);
}
