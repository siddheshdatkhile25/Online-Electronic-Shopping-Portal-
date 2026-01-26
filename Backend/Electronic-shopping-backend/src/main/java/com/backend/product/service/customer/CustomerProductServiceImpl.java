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

    // Get single active product
    @Override
    public CustomerProductResponse getActiveProductById(Long productId) {

        Product product = productRepository
                .findByIdAndActiveTrue(productId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Product not found"));

        return toCustomerResponse(product);
    }


    //  Filter by category
    @Override
    public List<CustomerProductResponse> getProductsByCategory(Long categoryId) {

        return productRepository.findByCategory_IdAndActiveTrue(categoryId)
                .stream()
                .map(this::toCustomerResponse)
                .collect(Collectors.toList());
    }

    //  Filter by brand
    @Override
    public List<CustomerProductResponse> getProductsByBrand(String brand) {

        return productRepository.findByBrandIgnoreCaseAndActiveTrue(brand)
                .stream()
                .map(this::toCustomerResponse)
                .collect(Collectors.toList());
    }

    
    public CustomerProductResponse toCustomerResponse(Product product) {

        return CustomerProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .price(product.getPrice())
                .brand(product.getBrand())
                .imgUrl(product.getImgUrl())
                .description(product.getDescription())
                .build();
    }
    
	//get brands by category
	public List<String> getBrandsByCategory(Long categoryId) {
	    return productRepository.findBrandsByCategory(categoryId);
	}


}

