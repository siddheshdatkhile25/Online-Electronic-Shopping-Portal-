package com.backend.category.service;

import java.io.IOException;
import java.util.List;

import org.springframework.stereotype.Service;

import com.backend.category.*;
import com.backend.category.DTO.CategoryRequest;
import com.backend.category.DTO.CategoryResponse;
import com.backend.category.entity.Category;
import com.backend.category.repository.CategoryRepository;
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
		
		if(categoryRepository.existsByName(request.getName())) {
			throw new RuntimeException("category already exists");
		}
		String imgUrl=null;
		imgUrl=fileUploadService.uploadFile(request.getImage(),"categories");
		 
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

		return categoryRepository.findAll()
		.stream()
		.map(Category->CategoryResponse.builder()
				.id(Category.getId())
				.name(Category.getName())
				.imageUrl(Category.getImageUrl())
				.build())
				.toList();
				
				}




}
