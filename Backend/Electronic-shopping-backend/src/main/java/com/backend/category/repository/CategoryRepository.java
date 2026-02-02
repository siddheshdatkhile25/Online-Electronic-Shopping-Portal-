package com.backend.category.repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.backend.AdminAnalytics.DTO.CategorySalesDTO;
import com.backend.category.DTO.CategoryResponse;
import com.backend.category.entity.Category;
import com.backend.common.Enums.OrderStatus;
import com.backend.product.entity.Product;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    boolean existsByNameAndActiveTrue(String name);

	List<Category> findByActiveTrue();

	Optional<Category> findByIdAndActiveTrue(Long categoryId);
	
	@Query("""
		    SELECT new com.backend.AdminAnalytics.DTO.CategorySalesDTO(
		        c.name,
		        SUM(oi.quantity),
		        SUM(oi.quantity * oi.price)
		    )
		    FROM OrderItem oi
		    JOIN oi.product p
		    JOIN p.category c
		    JOIN oi.order o
		    WHERE o.status = com.backend.common.Enums.OrderStatus.DELIVERED
		      AND p.active = true
		      AND c.active = true
		    GROUP BY c.name
		""")
		List<CategorySalesDTO> getCategoryWiseSales();




}
