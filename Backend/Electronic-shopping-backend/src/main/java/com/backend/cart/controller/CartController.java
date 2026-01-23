package com.backend.cart.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.backend.cart.dto.AddToCartDTO;
import com.backend.cart.entity.Cart;
import com.backend.cart.service.CartService;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    private final CartService cartService;

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/add")
    public Cart addToCart(@RequestBody AddToCartDTO dto) {
        return cartService.addToCart(dto);
    }

    @GetMapping
    public Cart viewCart() {
        return cartService.viewCart();
    }

    @DeleteMapping("/remove/{id}")
    public void remove(@PathVariable Long id) {
        cartService.removeItem(id);
    }
}
