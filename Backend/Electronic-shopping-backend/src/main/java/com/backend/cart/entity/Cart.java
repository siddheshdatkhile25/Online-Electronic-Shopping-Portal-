package com.backend.cart.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
	
//	@OneToOne
//	private User user;
	
//	 @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL)
//	private List<CartItem> items = new ArrayList<>();
	
	 private Double totalAmount;
	
}
