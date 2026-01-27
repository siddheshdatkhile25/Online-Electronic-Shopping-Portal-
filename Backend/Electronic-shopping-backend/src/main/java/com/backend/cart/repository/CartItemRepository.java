package com.backend.cart.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.cart.entity.Cart;
import com.backend.cart.entity.CartItem;
import com.backend.product.entity.Product;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
	 Optional<CartItem> findByCartAndProduct(Cart cart, Product product);
	 
	 
	 //to find the list of cart Items based on CartId
	 List<CartItem> findByCart_CartId(Long cartId);
	 
	 //To clear cart items of that specific cart
	 long deleteByCart_CartId(Long cartId);
}