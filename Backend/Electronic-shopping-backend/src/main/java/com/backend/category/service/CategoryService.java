package com.backend.category.service;

import java.util.List;

import com.backend.AdminAnalytics.DTO.CategorySalesDTO;
import com.backend.category.DTO.CategoryRequest;
import com.backend.category.DTO.CategoryResponse;



public interface CategoryService {

	
		CategoryResponse addCategory(CategoryRequest request);

		List<CategoryResponse> getAllCategories();

		void deleteCategory(Long categoryId);

		

		

	

		
}

