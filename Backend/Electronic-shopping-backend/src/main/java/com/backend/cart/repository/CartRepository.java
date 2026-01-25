package com.backend.cart.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.cart.entity.Cart;
import com.backend.user.entites.User;

public interface CartRepository extends JpaRepository<Cart, Long> {

	Optional<Cart> findByUserEmail(String email);
	
	
}
