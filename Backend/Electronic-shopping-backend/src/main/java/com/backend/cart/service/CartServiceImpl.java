package com.backend.cart.service;

import org.springframework.stereotype.Service;

import com.backend.cart.dto.AddToCartDTO;
import com.backend.cart.entity.Cart;
import com.backend.cart.repository.CartItemRepository;
import com.backend.cart.repository.CartRepository;

import jakarta.transaction.Transactional;


@Service
@Transactional


public class CartServiceImpl implements CartService  {
	
	private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    //private final UserRepository userRepository;
    
    
    public CartServiceImpl(
            CartRepository cartRepository,
            CartItemRepository cartItemRepository
            //UserRepository userRepository
            ) {

        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        //this.userRepository = userRepository;
    }
    
//    private User getLoggedInUser() {
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        return userRepository.findByEmail(auth.getName()).orElseThrow();
//    }
    

	@Override
	public Cart addToCart(AddToCartDTO dto) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Cart viewCart() {
		//return cartRepository.findByUser(getLoggedInUser()).orElseThrow();
		return null;
	}

	@Override
	public void removeItem(Long cartItemId) {
		cartItemRepository.deleteById(cartItemId);
	}


}
