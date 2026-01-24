package com.backend.product.entity;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.backend.category.entity.Category;
import com.backend.common.entites.BaseEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import jakarta.persistence.Index; 
@Entity
@Table(
	    name = "products",
	    indexes = {
	        @Index(name = "idx_product_active", columnList = "active"),
	        @Index(name = "idx_product_category", columnList = "category_id"),
	        @Index(name = "idx_product_category_brand", columnList = "category_id, brand"),
	        @Index(name = "idx_product_active_category", columnList = "active, category_id")
	    }
	)

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class Product extends BaseEntity{

	@Column(nullable=false)
	private String name;
	
	@Lob
	private String description;
	
	@Column(nullable=false)
	private BigDecimal price;
	
	@Column(nullable=false)
	private Integer stock;
	
	//Product-Category(ManyToOne)
	@ManyToOne(fetch=FetchType.LAZY)
	@JoinColumn(name="category_id",nullable=false)
	private Category category;
	
	@Column(nullable = false)
    private String brand; 
	
	 @Column(name="image_url", nullable=false)
	public String imgUrl;
	
	private Boolean active=true;

	

	
}
