package com.backend.product.controller.customer;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.common.dtos.ApiResponse;
import com.backend.product.DTO.CustomerProductResponse;
import com.backend.product.service.customer.CustomerProductService;

@RestController
@RequestMapping("/products")
public class CustomerProductController {

    private final CustomerProductService customerProductService;

    public CustomerProductController(CustomerProductService customerProductService) {
        this.customerProductService = customerProductService;
    }

    // Get all active products
    @GetMapping
    public ResponseEntity<ApiResponse<List<CustomerProductResponse>>> getAllProducts() {
        return ResponseEntity.ok(
                new ApiResponse<>("Products fetched successfully", customerProductService.getAllProducts())
        );
    }

    // Get product by ID
    @GetMapping("/id/{productId}")
    public ResponseEntity<ApiResponse<CustomerProductResponse>> getProductById(
            @PathVariable Long productId) {
        return ResponseEntity.ok(
                new ApiResponse<>("Product fetched successfully", customerProductService.getProductById(productId))
        );
    }

    // Get products by category
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<ApiResponse<List<CustomerProductResponse>>> getByCategory(
            @PathVariable Long categoryId) {
        return ResponseEntity.ok(
                new ApiResponse<>("Products fetched successfully", customerProductService.getProductsByCategory(categoryId))
        );
    }

    // Get products by brand
    @GetMapping("/brand/{brand}")
    public ResponseEntity<ApiResponse<List<CustomerProductResponse>>> getByBrand(
            @PathVariable String brand) {
        return ResponseEntity.ok(
                new ApiResponse<>("Products fetched successfully", customerProductService.getProductsByBrand(brand))
        );
    }

    // Get all brands
    @GetMapping("/brands")
    public ResponseEntity<ApiResponse<List<String>>> getAllBrands() {
        return ResponseEntity.ok(
                new ApiResponse<>("All brands", customerProductService.getAllBrands())
        );
    }

    // Get brands by category
    @GetMapping("/category/{categoryId}/brands")
    public ResponseEntity<ApiResponse<List<String>>> getBrandsByCategory(
            @PathVariable Long categoryId) {
        return ResponseEntity.ok(
                new ApiResponse<>("Brands fetched", customerProductService.getBrandsByCategory(categoryId))
        );
    }
}
