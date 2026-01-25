package com.backend.cart.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.cart.entity.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
	
	List<CartItem> findByCart_CartId(Long cartId); 
	
	long deleteByCart_CartId(Long cartId); 
	
	

}
