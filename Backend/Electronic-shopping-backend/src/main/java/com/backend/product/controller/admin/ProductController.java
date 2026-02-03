package com.backend.product.controller.admin;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.common.dtos.ApiResponse;
import com.backend.product.DTO.ProductRequest;
import com.backend.product.DTO.ProductResponse;
import com.backend.product.service.admin.ProductService;

@RestController
@RequestMapping("/admin/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // ✅ CREATE PRODUCT (MULTIPART AUTO-DETECTED)
    @PostMapping(consumes = "multipart/form-data") // update: explicitly define multipart support
    public ResponseEntity<ApiResponse<ProductResponse>> createProduct(
            @ModelAttribute ProductRequest request) {

        ProductResponse response = productService.createProduct(request);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new ApiResponse<>("Product created successfully", response));
    }

    // GET ALL PRODUCTS
    @GetMapping
    public ResponseEntity<ApiResponse<List<ProductResponse>>> getAllProducts() {

        List<ProductResponse> response = productService.getAllProducts();
        return ResponseEntity.ok(new ApiResponse<>("All Products Available", response));
    }

    // GET PRODUCT BY ID
    @GetMapping("/{productId}")
    public ResponseEntity<ApiResponse<ProductResponse>> getProductById(
            @PathVariable Long productId) {

        ProductResponse product = productService.getProductById(productId);

        return ResponseEntity.ok(
                new ApiResponse<>("Product fetched successfully", product)
        );
    }

    // UPDATE PRODUCT
    @PutMapping(value = "/{productId}", consumes = "multipart/form-data") // update: allow multipart updates
    public ResponseEntity<ApiResponse<ProductResponse>> updateProduct(
            @PathVariable Long productId,
            @ModelAttribute ProductRequest request) {

        ProductResponse updated = productService.updateProduct(productId, request);

        return ResponseEntity.ok(
                new ApiResponse<>("Product updated successfully", updated)
        );
    }

    // DELETE PRODUCT
    @DeleteMapping("/{productId}")
    public ResponseEntity<ApiResponse<Void>> deleteProduct(
            @PathVariable Long productId) {

        productService.deleteProduct(productId);

        return ResponseEntity.ok(
                new ApiResponse<>("Product deleted successfully", null)
        );
    }

    // TOGGLE STATUS
    @PutMapping("/{productId}/toggle-status")
    public ResponseEntity<ApiResponse<ProductResponse>> toggleProductStatus(
            @PathVariable Long productId) {

        ProductResponse response = productService.toggleProductStatus(productId);

        return ResponseEntity.ok(
                new ApiResponse<>("Product status updated successfully", response)
        );
    }

    // ADD STOCK
    @PutMapping("/{productId}/add-stock")
    public ResponseEntity<ApiResponse<ProductResponse>> addProductStock(
            @PathVariable Long productId,
            @RequestParam Integer quantity) {

        ProductResponse response = productService.addProductStock(productId, quantity);

        return ResponseEntity.ok(
                new ApiResponse<>("Stock added successfully", response)
        );
    }
}
