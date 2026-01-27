package com.backend.cart.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.backend.cart.dto.CartDTO;
import com.backend.cart.service.CartService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users/cart")
@RequiredArgsConstructor
@PreAuthorize("hasAnyRole('USER', 'ADMIN')")

public class CartController {

    private final CartService cartService;

    // add to cart
    @PostMapping("/add")
    public ResponseEntity<CartDTO> addToCart(
            @RequestParam Long productId,
            @RequestParam int quantity,
            @AuthenticationPrincipal UserDetails userDetails) {

        CartDTO cartDTO = cartService.addItemToCart(
                userDetails.getUsername(),
                productId,
                quantity
        );
        return ResponseEntity.ok(cartDTO);
    }

    // get user cart
    @GetMapping
    public ResponseEntity<CartDTO> getCart(
            @AuthenticationPrincipal UserDetails userDetails) {

        return ResponseEntity.ok(
                cartService.getUserCart(userDetails.getUsername())
        );
    }

    // update quantity
    @PutMapping("/update")
    public ResponseEntity<CartDTO> updateQuantity(
            @RequestParam Long cartItemId,
            @RequestParam int quantity) {

        return ResponseEntity.ok(
                cartService.updateQuantity(cartItemId, quantity)
        );
    }

    // remove cart
    @DeleteMapping("/remove/{cartItemId}")
    public ResponseEntity<String> removeItem(@PathVariable Long cartItemId) {

        cartService.removeItem(cartItemId);
        return ResponseEntity.ok("Item removed from cart");
    }

    // clear cart
    @DeleteMapping("/clear")
    public ResponseEntity<String> clearCart(
            @AuthenticationPrincipal UserDetails userDetails) {

        cartService.clearCart(userDetails.getUsername());
        return ResponseEntity.ok("Cart cleared");
    }
}