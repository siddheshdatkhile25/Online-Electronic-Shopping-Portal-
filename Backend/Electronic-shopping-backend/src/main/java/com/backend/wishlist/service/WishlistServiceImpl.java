package com.backend.wishlist.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.backend.cart.service.CartService;
import com.backend.product.entity.Product;
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

    public WishlistServiceImpl(WishlistRepository wishlistRepository,
            ProductRepository productRepository,
            UserRepository userRepository,
            CartService cartService) {
		this.wishlistRepository = wishlistRepository;
		this.productRepository = productRepository;
		this.userRepository = userRepository;
		this.cartService = cartService;
		}

    @Override
    public void addProductToWishlist(Long userId, Long productId) {

        Wishlist wishlist = wishlistRepository.findByUserId(userId)
                .orElseGet(() -> {
                    User user = userRepository.findById(userId)
                            .orElseThrow(() -> new RuntimeException("User not found"));
                    Wishlist w = new Wishlist();
                    w.setUser(user);
                    return wishlistRepository.save(w);
                });

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

     
        boolean alreadyExists = wishlist.getProducts()
                .stream()
                .anyMatch(p -> p.getId().equals(productId));

        if (alreadyExists) {
            return; 
        }

        wishlist.getProducts().add(product);
        wishlistRepository.save(wishlist);
    }

    @Override
    public void removeProductFromWishlist(Long userId, Long productId) {

        Wishlist wishlist = wishlistRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Wishlist not found"));

        wishlist.getProducts()
                .removeIf(product -> product.getId().equals(productId));

        wishlistRepository.save(wishlist);
    }

    @Override
    public List<WishlistProductDTO> getWishlistByUser(Long userId) {

        Wishlist wishlist = wishlistRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Wishlist not found"));

        return wishlist.getProducts()
                .stream()
                .map(product -> new WishlistProductDTO(
                        product.getId(),
                        product.getName(),
                        product.getPrice(),
                        product.getImgUrl()   
                ))
                .toList();
    }
    
    @Override
    public void moveToCart(Long userId, Long productId) {

        Wishlist wishlist = wishlistRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Wishlist not found"));

        Product product = wishlist.getProducts()
                .stream()
                .filter(p -> p.getId().equals(productId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Product not in wishlist"));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        cartService.addItemToCart(user.getEmail(), productId, 1);

        wishlist.getProducts().remove(product);

        wishlistRepository.save(wishlist);
    }
}
