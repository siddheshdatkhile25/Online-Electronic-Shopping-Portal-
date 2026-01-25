package com.backend.wishlist.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.backend.user.entites.User;
import com.backend.wishlist.service.WishlistService;

@RestController
@RequestMapping("/api/users/wishlist")
public class WishlistController {

    private final WishlistService wishlistService;

    public WishlistController(WishlistService wishlistService) {
        this.wishlistService = wishlistService;
    }

    @PostMapping("/add/{productId}")
    public ResponseEntity<?> addToWishlist(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long productId) {

        User user = (User) userDetails;
        wishlistService.addProductToWishlist(user.getId(), productId);
        return ResponseEntity.ok("Product added to wishlist");
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<?> removeFromWishlist(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long productId) {

        User user = (User) userDetails;
        wishlistService.removeProductFromWishlist(user.getId(), productId);
        return ResponseEntity.ok("Product removed from wishlist");
    }

    @GetMapping
    public ResponseEntity<?> getWishlist(
            @AuthenticationPrincipal UserDetails userDetails) {

        User user = (User) userDetails;
        return ResponseEntity.ok(
                wishlistService.getWishlistByUser(user.getId())
        );
    }
    
    @PostMapping("/move-to-cart/{productId}")
    public ResponseEntity<?> moveToCart(
            @AuthenticationPrincipal UserDetails userDetails,
            @PathVariable Long productId) {

        User user = (User) userDetails;
        wishlistService.moveToCart(user.getId(), productId);

        return ResponseEntity.ok("Moved product from wishlist to cart");
    }
}
