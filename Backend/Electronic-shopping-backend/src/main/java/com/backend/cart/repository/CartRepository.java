package com.backend.cart.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.cart.entity.Cart;
import com.backend.user.entites.User;
import java.util.List;


public interface CartRepository extends JpaRepository<Cart, Long> {

	Optional<Cart> findByUser_Email(String email);
	
	Optional<Cart> findByUser(User user);
	
	

}
