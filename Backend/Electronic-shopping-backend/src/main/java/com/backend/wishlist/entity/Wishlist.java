package com.backend.wishlist.entity;

import java.util.HashSet;
import java.util.Set;

import com.backend.product.entity.Product;
import com.backend.user.entites.User;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

//JPA
@Entity
@Table(name = "wishlists")

//lombok
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"user", "products"})

public class Wishlist {

	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 private Long id;

	 @OneToOne
	 @JoinColumn(name = "user_id", nullable = false, unique = true)
	 private User user;
	 
	 
	@ManyToMany
    @JoinTable(
    		name = "wishlist_products",
	        joinColumns = @JoinColumn(name = "wishlist_id"),
	        inverseJoinColumns = @JoinColumn(name = "product_id")
    		)
	private Set<Product> products = new HashSet<>();
	 

}
