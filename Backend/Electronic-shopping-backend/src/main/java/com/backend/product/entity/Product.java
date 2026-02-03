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
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Index;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

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
public class Product extends BaseEntity {

    @Column(nullable = false)
    private String name;

    @Lob
    private String description;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(nullable = false)
    private Integer stock;

    //Product-Category(ManyToOne)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    @Column(nullable = false)
    private String brand;

    // Product images (1 main + up to 3 sub images)
    @OneToMany(
        mappedBy = "product",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    private List<ProductImage> images;

    private Boolean active = true;

    // DISCOUNT (PERCENTAGE)

    // e.g. 10 means 10% discount
    @Column(name = "discount_percentage")
    private Double discountPercentage;

    // final price after applying discount percentage
    @Column(name = "discounted_price")
    private BigDecimal discountedPrice;
}
