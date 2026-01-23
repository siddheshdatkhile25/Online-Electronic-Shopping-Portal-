package com.backend.cart.service;

import org.springframework.stereotype.Service;

import com.backend.cart.dto.AddToCartDTO;
import com.backend.cart.entity.Cart;

import jakarta.transaction.Transactional;



public interface CartService {
	
	Cart addToCart(AddToCartDTO dto);
    Cart viewCart();
    void removeItem(Long cartItemId);

}
