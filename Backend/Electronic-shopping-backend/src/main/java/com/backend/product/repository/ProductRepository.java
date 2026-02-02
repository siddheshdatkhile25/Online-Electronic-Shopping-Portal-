package com.backend.product.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.product.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Find product by ID and active
    Optional<Product> findByIdAndActiveTrue(Long productId);

    // Find products by category ID (active only)
    List<Product> findByCategory_IdAndActiveTrue(Long categoryId);

    // Find products by brand (active only)
    Optional<Product> findByBrandIgnoreCaseAndActiveTrue(String brand);

    // All active products
    List<Product> findByActiveTrue();

    // All brands from active products
    @Query("SELECT DISTINCT p.brand FROM Product p WHERE p.active = true")
    List<String> findAllBrands();

    // Brands by category from active products
    @Query("""
        SELECT DISTINCT p.brand
        FROM Product p
        WHERE p.active = true AND p.category.id = :categoryId
        """)
    List<String> findBrandsByCategory(Long categoryId);
}
