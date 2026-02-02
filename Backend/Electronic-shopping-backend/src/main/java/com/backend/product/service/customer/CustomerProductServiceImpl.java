package com.backend.product.service.customer;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.backend.common.exception.ResourceNotFoundException;
import com.backend.product.DTO.CustomerProductResponse;
import com.backend.product.entity.Product;
import com.backend.product.repository.ProductRepository;

import jakarta.transaction.Transactional;

@Transactional
@Service
public class CustomerProductServiceImpl implements CustomerProductService {

    private final ProductRepository productRepository;

    public CustomerProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    // Get single product by ID (product + category must be active)
    @Override
    public CustomerProductResponse getProductById(Long productId) {

        Product product = productRepository
                .findByIdAndActiveTrueAndCategory_ActiveTrue(productId)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        return toCustomerResponse(product);
    }

    // Get all products visible to customers
    @Override
    public List<CustomerProductResponse> getAllProducts() {

        return productRepository.findByActiveTrueAndCategory_ActiveTrue()
                .stream()
                .map(this::toCustomerResponse)
                .collect(Collectors.toList());
    }

    // Get products by category (category must be active)
    @Override
    public List<CustomerProductResponse> getProductsByCategory(Long categoryId) {

        return productRepository
                .findByCategory_IdAndActiveTrueAndCategory_ActiveTrue(categoryId)
                .stream()
                .map(this::toCustomerResponse)
                .collect(Collectors.toList());
    }

    // Get products by brand
    @Override
    public List<CustomerProductResponse> getProductsByBrand(String brand) {

        return productRepository
                .findByBrandIgnoreCaseAndActiveTrueAndCategory_ActiveTrue(brand)
                .stream()
                .map(this::toCustomerResponse)
                .collect(Collectors.toList());
    }

    // Convert Product entity to CustomerProductResponse
    private CustomerProductResponse toCustomerResponse(Product product) {

        return CustomerProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .discountPercentage(
                        product.getDiscountPercentage() != null
                                ? product.getDiscountPercentage()
                                : 0
                )
                .discountedPrice(
                        product.getDiscountedPrice() != null
                                ? product.getDiscountedPrice()
                                : product.getPrice()
                )
                .categoryName(product.getCategory().getName())
                .brand(product.getBrand())
                .imgUrl(product.getImgUrl())
                .stock(product.getStock())
                .build();
    }

    // Get all brands visible to customers
    @Override
    public List<String> getAllBrands() {
        return productRepository.findAllActiveBrands();
    }

    // Get brands by category (category must be active)
    @Override
    public List<String> getBrandsByCategory(Long categoryId) {
        return productRepository.findActiveBrandsByCategory(categoryId);
    }
}
