package com.backend.wishlist.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.cart.service.CartService;
import com.backend.product.entity.Product;
import com.backend.product.entity.ProductImage;
import com.backend.product.repository.ProductRepository;
import com.backend.user.Repository.UserRepository;
import com.backend.user.entites.User;
import com.backend.wishlist.dto.WishlistProductDTO;
import com.backend.wishlist.entity.Wishlist;
import com.backend.wishlist.repository.WishlistRepository;

@Service
@Transactional
public class WishlistServiceImpl implements WishlistService {

    private final WishlistRepository wishlistRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final CartService cartService;

    public WishlistServiceImpl(
            WishlistRepository wishlistRepository,
            ProductRepository productRepository,
            UserRepository userRepository,
            CartService cartService) {

        this.wishlistRepository = wishlistRepository;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
        this.cartService = cartService;
    }

    @Override
    public void addProductToWishlistByEmail(String email, Long productId) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Wishlist wishlist = wishlistRepository.findByUserId(user.getId())
                .orElseGet(() -> {
                    Wishlist w = new Wishlist();
                    w.setUser(user);
                    return wishlistRepository.save(w);
                });

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        boolean exists = wishlist.getProducts()
                .stream()
                .anyMatch(p -> p.getId().equals(productId));

        if (!exists) {
            wishlist.getProducts().add(product);
            wishlistRepository.save(wishlist);
        }
    }


    @Override
    public void removeProductFromWishlistByEmail(String email, Long productId) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Wishlist wishlist = wishlistRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Wishlist not found"));

        wishlist.getProducts()
                .removeIf(product -> product.getId().equals(productId));

        wishlistRepository.save(wishlist);
    }


    @Override
    public List<WishlistProductDTO> getWishlistByUserByEmail(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Wishlist wishlist = wishlistRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Wishlist not found"));

        return wishlist.getProducts()
                .stream()
                .map(product -> {
                    String imageUrl = product.getImages()
                            .stream()
                            .filter(img -> Boolean.TRUE.equals(img.getIsPrimary()))
                            .findFirst()
                            .map(ProductImage::getImageUrl)
                            .orElse(
                                    product.getImages().isEmpty()
                                            ? null
                                            : product.getImages().get(0).getImageUrl()
                            );

                    return new WishlistProductDTO(
                            product.getId(),
                            product.getName(),
                            product.getPrice(),
                            imageUrl
                    );
                })
                .toList();
    }
    
    @Override
    public void moveToCartByEmail(String email, Long productId) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Wishlist wishlist = wishlistRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Wishlist not found"));

        Product product = wishlist.getProducts()
                .stream()
                .filter(p -> p.getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Product not in wishlist"));

        cartService.addItemToCart(user.getEmail(), productId, 1);

        wishlist.getProducts().remove(product);
        wishlistRepository.save(wishlist);
    }



    
}
