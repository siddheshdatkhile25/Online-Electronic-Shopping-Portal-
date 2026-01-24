package com.backend.product.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.backend.product.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    
     // Fetch all products belonging to a specific category
     List<Product> findByCategoryId(Long categoryId);

	List<Product> findByCategory_IdAndActiveTrue(Long categoryId);

	List<Product> findByBrandIgnoreCaseAndActiveTrue(String brand);
	
	@Query("SELECT DISTINCT p.brand from Product p WHERE p.active=true")
	List<String> findAllBrands();

	@Query("""
		    SELECT DISTINCT p.brand
		    FROM Product p
		    WHERE p.active = true
		    AND p.category.id = :categoryId
		""")
		List<String> findBrandsByCategory(Long categoryId);

	
    
}
