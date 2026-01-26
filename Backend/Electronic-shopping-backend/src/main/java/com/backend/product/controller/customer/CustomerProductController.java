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

   //All Active Products
    @GetMapping
    public ResponseEntity<ApiResponse<List<CustomerProductResponse>>> getAllActiveProducts() {

        List<CustomerProductResponse> products =
                customerProductService.getAllActiveProducts();

        return ResponseEntity.ok(
                new ApiResponse<>("Products fetched successfully", products)
        );
    }

    //Product by id
    @GetMapping("/id/{productId}")
    public ResponseEntity<ApiResponse<CustomerProductResponse>> getProductById(
            @PathVariable Long productId) {

        CustomerProductResponse product =
                customerProductService.getActiveProductById(productId);

        return ResponseEntity.ok(
                new ApiResponse<>("Product fetched successfully", product)
        );
    }

   //All Products by category
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<ApiResponse<List<CustomerProductResponse>>> getByCategory(
            @PathVariable Long categoryId) {

        List<CustomerProductResponse> products =
                customerProductService.getProductsByCategory(categoryId);

        return ResponseEntity.ok(
                new ApiResponse<>("Products fetched successfully", products)
        );
    }

   //All products by brand
    @GetMapping("/brand/{brand}")
    public ResponseEntity<ApiResponse<List<CustomerProductResponse>>> getByBrand(
            @PathVariable String brand) {

        List<CustomerProductResponse> products =
                customerProductService.getProductsByBrand(brand);

        return ResponseEntity.ok(
                new ApiResponse<>("Products fetched successfully", products)
        );
    }
    
    //All brands
    @GetMapping("/brands")
    public ResponseEntity<ApiResponse<List<String>>> getAllBrands() {
        return ResponseEntity.ok(
            new ApiResponse<>("All brands", customerProductService.getAllActiveBrands())
        );
    }
    
    @GetMapping("/category/{categoryId}/brands")
    public ResponseEntity<ApiResponse<List<String>>> getBrandsByCategory(
            @PathVariable Long categoryId) {

        return ResponseEntity.ok(
            new ApiResponse<>("Brands fetched", 
                customerProductService.getBrandsByCategory(categoryId))
        );
    }

    
}