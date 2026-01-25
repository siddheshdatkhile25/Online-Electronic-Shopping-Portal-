package com.backend.cart.entity;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.backend.user.entites.User;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

// JPA Annotations
@Entity
@Table(name = "cart")

// Lombok
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString


public class Cart {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long cartId;
	
	@OneToOne
	@JoinColumn(name = "user_id", nullable = false)
    private User user;
	
	@OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CartItem> cartItems = new ArrayList<>();
	
	private LocalDateTime createdAt = LocalDateTime.now();
	
	private Double totalAmount;
	
}
