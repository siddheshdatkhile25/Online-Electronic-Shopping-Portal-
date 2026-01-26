package com.backend.cart.service;

import com.backend.cart.dto.CartDTO;

public interface CartService {

    CartDTO addItemToCart(String email, Long productId, int quantity);

    CartDTO getUserCart(String email);

    CartDTO updateQuantity(Long cartItemId, int quantity);

    void removeItem(Long cartItemId);

    void clearCart(String email);
}
