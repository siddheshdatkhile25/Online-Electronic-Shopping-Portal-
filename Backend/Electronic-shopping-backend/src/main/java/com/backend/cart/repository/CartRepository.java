package com.backend.cart.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.cart.entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {

	//Optional<Cart> findByUser(User user);
	
	
}
