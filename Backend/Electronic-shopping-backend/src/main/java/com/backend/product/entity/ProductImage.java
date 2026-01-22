package com.backend.product.entity;

import com.backend.common.entites.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "product_images")
@Data
@Getter
@Setter

public class ProductImage extends BaseEntity{

   
    @Column(nullable = false)
    private String imageUrl;
    
    //main img and sub images
    private Boolean isPrimary = false;

    
}