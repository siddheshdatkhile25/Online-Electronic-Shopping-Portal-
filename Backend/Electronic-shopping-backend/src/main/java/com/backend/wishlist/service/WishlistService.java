package com.backend.wishlist.service;

import java.util.List;
import com.backend.wishlist.dto.WishlistProductDTO;

public interface WishlistService {

    void addProductToWishlistByEmail(String email, Long productId);

    void removeProductFromWishlistByEmail(String email, Long productId);


    List<WishlistProductDTO> getWishlistByUserByEmail(String email);
    
    void moveToCartByEmail(String email, Long productId);

}
