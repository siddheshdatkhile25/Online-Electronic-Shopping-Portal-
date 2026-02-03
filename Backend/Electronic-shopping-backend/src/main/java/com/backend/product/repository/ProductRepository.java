package com.backend.product.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.product.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {


    Optional<Product> findByIdAndActiveTrueAndCategory_ActiveTrue(Long id);


    // All active products whose category is also active
    List<Product> findByActiveTrueAndCategory_ActiveTrue();

    // Products by category (only if product + category both active)
    List<Product> findByCategory_IdAndActiveTrueAndCategory_ActiveTrue(Long categoryId);

    // Products by brand (only if product + category both active)
    List<Product> findByBrandIgnoreCaseAndActiveTrueAndCategory_ActiveTrue(String brand);

   

    @Query("""
        SELECT DISTINCT p.brand
        FROM Product p
        WHERE p.active = true
          AND p.category.active = true
    """)
    List<String> findAllActiveBrands();

    @Query("""
        SELECT DISTINCT p.brand
        FROM Product p
        WHERE p.active = true
          AND p.category.active = true
          AND p.category.id = :categoryId
    """)
    List<String> findActiveBrandsByCategory(Long categoryId);
}
