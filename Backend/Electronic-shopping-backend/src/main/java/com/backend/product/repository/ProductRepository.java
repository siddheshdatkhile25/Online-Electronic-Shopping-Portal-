package com.backend.product.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.product.entity.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

    
     // Fetch all products belonging to a specific category
     
    List<Product> findByCategory_Id(Long categoryId);

    
}
