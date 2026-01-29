package com.backend.category.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.category.DTO.CategoryRequest;
import com.backend.category.DTO.CategoryResponse;
import com.backend.category.service.CategoryService;
import com.backend.common.dtos.ApiResponse;


@RestController
@RequestMapping("/admin/categories")

public class CategoryController {
	
	
	private final CategoryService categoryService;
	
	public CategoryController(CategoryService categoryService) {
	
		this.categoryService = categoryService;
	}

	@PostMapping(consumes = "multipart/form-data")
	public ResponseEntity<CategoryResponse> addCategory(@ModelAttribute CategoryRequest request )
	{
		CategoryResponse res=categoryService.addCategory(request);
		return ResponseEntity.status(HttpStatus.CREATED).body(res);
		
	}
	@GetMapping
	public ResponseEntity<ApiResponse<List<CategoryResponse>>> getAllCategories() {
	    return ResponseEntity.ok(
	        new ApiResponse<>("All categories", categoryService.getAllCategories())
	    );
	}

}