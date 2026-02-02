package com.backend.cart.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.backend.cart.dto.CartDTO;
import com.backend.cart.dto.CartItemDTO;
import com.backend.cart.entity.Cart;
import com.backend.cart.entity.CartItem;
import com.backend.cart.repository.CartItemRepository;
import com.backend.cart.repository.CartRepository;
import com.backend.product.entity.Product;
import com.backend.product.repository.ProductRepository;
import com.backend.user.Repository.UserRepository;
import com.backend.user.entites.User;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    // ================= ADD ITEM =================
    @Override
    public CartDTO addItemToCart(String email, Long productId, int quantity) {

        if (quantity <= 0) {
            throw new RuntimeException("Quantity must be greater than zero");
        }

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUser_Email(email)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });

        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Optional<CartItem> existingItem =
                cartItemRepository.findByCartAndProduct(cart, product);

        if (existingItem.isPresent()) {
            CartItem item = existingItem.get();
            item.setQuantity(item.getQuantity() + quantity);
            cartItemRepository.save(item);  
        } else {
            CartItem item = new CartItem();
            item.setCart(cart);
            item.setProduct(product);
            item.setQuantity(quantity);
            item.setPrice(product.getPrice());

            cart.getCartItems().add(item);
            cartItemRepository.save(item);   
        }

        return mapToDTO(cart);
    }

    // ================= GET CART =================
    @Override
    public CartDTO getUserCart(String email) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Cart cart = cartRepository.findByUser_Email(email)
                .orElseGet(() -> {
                    Cart newCart = new Cart();
                    newCart.setUser(user);
                    return cartRepository.save(newCart);
                });

        return mapToDTO(cart);
    }

    // ================= UPDATE QUANTITY =================
    @Override
    public CartDTO updateQuantity(Long cartItemId, int quantity) {

        if (quantity < 0) {
            throw new RuntimeException("Quantity cannot be negative");
        }

        CartItem item = cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        Cart cart = item.getCart();

        if (quantity == 0) {
            cartItemRepository.delete(item);
        } else {
            item.setQuantity(quantity);
        }

        return mapToDTO(cart);
    }

    // ================= REMOVE ITEM =================
    @Override
    public void removeItem(Long cartItemId) {
        cartItemRepository.deleteById(cartItemId);
    }

    // ================= CLEAR CART =================
    @Override
    public void clearCart(String email) {

        Cart cart = cartRepository.findByUser_Email(email)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        cart.getCartItems().clear();
        cartRepository.save(cart);
    }

    // ================= DTO MAPPER =================
    private CartDTO mapToDTO(Cart cart) {

        List<CartItemDTO> itemDTOs = cart.getCartItems().stream()
                .map(item -> new CartItemDTO(
                        item.getCartItemId(),
                        item.getProduct().getId(),
                        item.getProduct().getName(),
                        item.getProduct().getImgUrl(),
                        item.getQuantity(),
                        item.getPrice(),
                        item.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()))
                ))
                .toList();

        BigDecimal total = itemDTOs.stream()
                .map(CartItemDTO::getTotalPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new CartDTO(cart.getCartId(), itemDTOs, total);
    }
}
