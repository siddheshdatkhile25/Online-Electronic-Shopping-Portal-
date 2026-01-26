package com.backend.category.repository;

import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.category.*;
import com.backend.category.DTO.CategoryResponse;
import com.backend.category.entity.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    boolean existsByName(String name);

    List<Category> findByActiveTrue();

}
