package com.backend.product.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.backend.category.entity.Category;
import com.backend.product.entity.Product;
import com.backend.product.entity.ProductImage;
import com.backend.product.repository.ProductRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    
     // Add new product under a specific category
    
    @Override
    public Product createProduct(
            String name,
            String description,
            BigDecimal price,
            Integer stock,
            Long categoryId,
            List<MultipartFile> images
    ) {

        Product product = new Product();
        product.setName(name);
        product.setDescription(description);
        product.setPrice(price);
        product.setStock(stock);
        product.setActive(true);

        //  Set category reference 
        Category category = new Category();
        category.setId(categoryId);
        product.setCategory(category);

        //  Handle product images
        List<ProductImage> productImages = new ArrayList<>();

        if (images != null && !images.isEmpty()) {
            for (int i = 0; i < images.size(); i++) {
                MultipartFile file = images.get(i);

                String imageUrl = saveImage(file);

                ProductImage image = new ProductImage();
                image.setImageUrl(imageUrl);
                image.setIsPrimary(i == 0); // first image is primary

                productImages.add(image);
            }
        }

        //product.setImages(productImages);

        return productRepository.save(product);
    }

    
     // Get all products
     
    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Get product by id
     
    @Override
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    
     // Get products by category
    
    @Override
    public List<Product> getProductsByCategory(Long categoryId) {
        return productRepository.findByCategoryId(categoryId);
    }

    
     // Dummy image upload logic
     
    private String saveImage(MultipartFile file) {
        return "uploads/" + System.currentTimeMillis() + "_" + file.getOriginalFilename();
    }
}
