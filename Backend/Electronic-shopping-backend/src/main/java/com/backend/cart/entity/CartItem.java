package com.backend.cart.entity;

import java.math.BigDecimal;

import com.backend.product.entity.Product;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

// JPA Annotations
@Entity
@Table(name = "cart_items")

// Lombok
@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor

public class CartItem {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long cartItemId;
	
	@ManyToOne
	@JoinColumn(name = "cart_id")
    private Cart cart;
	 
    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
	 
	 private int quantity;
	 
	 private BigDecimal price;

}
