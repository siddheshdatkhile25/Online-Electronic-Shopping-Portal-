package com.backend.category.service;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.AdminAnalytics.DTO.CategorySalesDTO;
import com.backend.category.DTO.CategoryRequest;
import com.backend.category.DTO.CategoryResponse;
import com.backend.category.entity.Category;
import com.backend.category.repository.CategoryRepository;
import com.backend.common.Enums.OrderStatus;
import com.backend.common.exception.DuplicateResourceException;
import com.backend.common.exception.ResourceNotFoundException;
import com.backend.common.service.FileUploadService;
import com.backend.product.repository.ProductRepository;

@Service
public class CategoryServiceImpl implements CategoryService{
	
	private final CategoryRepository categoryRepository;
	private final FileUploadService fileUploadService;


	public CategoryServiceImpl(CategoryRepository categoryRepository,FileUploadService fileUploadService) {
		
		this.categoryRepository = categoryRepository;
		 this.fileUploadService = fileUploadService;
	}

	@Override
	public CategoryResponse addCategory(CategoryRequest request) {
		
		if (categoryRepository.existsByNameAndActiveTrue(request.getName())) {
	        throw new DuplicateResourceException("Category already exists");
	    }

		if (request.getImage() == null || request.getImage().isEmpty()) {
        throw new IllegalArgumentException("Category image is required");
    	}
		
		String imgUrl = fileUploadService.uploadFile(request.getImage(), "categories");
		 
		Category category=new Category();
		category.setName(request.getName());
		category.setImageUrl(imgUrl);
		
		Category savedCategory =categoryRepository.save(category);
		return convertToResponse(savedCategory);
		
	}

	public CategoryResponse convertToResponse(Category savedCategory) {
		CategoryResponse res=CategoryResponse.builder()
				.id(savedCategory.getId())
				.name(savedCategory.getName())
				.imageUrl(savedCategory.getImageUrl())
				.createdAt(savedCategory.getCreatedAt())
				.build();
		return res;
	}



	@Override
	public List<CategoryResponse> getAllCategories() {

		return categoryRepository.findByActiveTrue()
		.stream()
		.map(Category->CategoryResponse.builder()
				.id(Category.getId())
				.name(Category.getName())
				.imageUrl(Category.getImageUrl())
				.build())
				.toList();
				
				}

	

	@Override
	public void deleteCategory(Long id) {

	    Category category = categoryRepository.findByIdAndActiveTrue(id)
    		.orElseThrow(() -> new ResourceNotFoundException("Category not found"));

	    category.setActive(false);

	    categoryRepository.save(category);
	}

	

}