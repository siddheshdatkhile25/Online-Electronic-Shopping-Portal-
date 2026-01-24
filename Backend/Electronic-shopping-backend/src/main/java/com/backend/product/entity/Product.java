package com.backend.product.entity;

import java.math.BigDecimal;
import java.util.List;

import com.backend.category.entity.Category;
import com.backend.common.entites.BaseEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="products")
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Product extends BaseEntity{

	@Column(nullable=false)
	private String name;
	
	private String description;
	
	@Column(nullable=false)
	private BigDecimal price;
	
	@Column(nullable=false)
	private Integer stock;
	
	//Product-Category(ManyToOne)
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="category_id",nullable=false)
	private Category category;
	
	//Product-Image(OneToMany)
	//orphanRemoval=true Auto-delete removed images
	@OneToMany(cascade=CascadeType.ALL,orphanRemoval=true)
	@JoinColumn(name="product_id")
	private List<ProductImage> images;
	
	private Boolean active;
}
