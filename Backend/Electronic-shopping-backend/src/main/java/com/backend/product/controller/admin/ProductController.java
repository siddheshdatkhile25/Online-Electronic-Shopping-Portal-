package com.backend.product.controller.admin;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.common.dtos.ApiResponse;
import com.backend.product.DTO.ProductRequest;
import com.backend.product.DTO.ProductResponse;
import com.backend.product.entity.Product;
import com.backend.product.service.admin.ProductService;

@RestController
@RequestMapping("/admin/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    //For adding Products
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<ProductResponse>> createProduct(@ModelAttribute ProductRequest request) {
      ProductResponse response=productService.createProduct(request);
      return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse<>("Product created successfully",response));
	
    }
    
    //get all products
    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getAllProducts(){
    	List<ProductResponse> response=productService.getAllProducts();
		return ResponseEntity.ok(new ApiResponse("All Products Available",response));
    }
    
    
    //get product by id
    @GetMapping("/{productId}")
    public ResponseEntity<ApiResponse<ProductResponse>> getProductById(
            @PathVariable Long productId) {

        ProductResponse product = productService.getProductById(productId);
        return ResponseEntity.ok(
            new ApiResponse<>("Product fetched successfully", product)
        );
    }

    //update product
    @PutMapping(value = "/{productId}", consumes = "multipart/form-data")
    public ResponseEntity<ApiResponse<ProductResponse>> updateProduct(
            @PathVariable Long productId,
            @ModelAttribute ProductRequest request) {

        ProductResponse updated = productService.updateProduct(productId, request);
        return ResponseEntity.ok(
            new ApiResponse<>("Product updated successfully", updated)
        );
    }

    
    //delete product
    @DeleteMapping("/{productId}")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(
            @PathVariable Long productId) {

        productService.deleteProduct(productId);
        return ResponseEntity.ok(
            new ApiResponse<>("Product deleted successfully", null)
        );
    }

    
    
    
    
    
    
    
    
    
    
    

    
}