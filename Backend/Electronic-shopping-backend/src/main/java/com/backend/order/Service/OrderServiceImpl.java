package com.backend.order.Service;



import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.backend.cart.entity.Cart;
import com.backend.cart.entity.CartItem;
import com.backend.cart.repository.CartItemRepository;
import com.backend.cart.repository.CartRepository;
import com.backend.common.Enums.OrderStatus;
import com.backend.common.Enums.PaymentStatus;
import com.backend.order.Repository.OrderItemRepository;
import com.backend.order.Repository.OrderRepository;
import com.backend.order.Repository.PaymentRepository;
import com.backend.order.entites.OrderItem;
import com.backend.order.entites.Orders;
import com.backend.order.entites.Payment;
import com.backend.product.controller.customer.CustomerProductController;
import com.backend.security.CustomUserDetailsService;
import com.backend.user.Repository.UserRepository;
import com.backend.user.entites.User;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {



	private final CartRepository cartRepository;
	private final CartItemRepository cartItemRepository;
	private final OrderRepository orderRepository;
	private final OrderItemRepository orderItemRepository;
	private final UserRepository userRepository;
	private final PaymentRepository paymentRepository;


    

   
	
	@Override
	public Object placeOrder(Long userId) {
		
		//logged-in user
		User user = userRepository.findById(userId).orElseThrow( () -> new RuntimeException("User Not Found"));
		
		
		//fetch cart
		Cart cart = cartRepository.findByUser(user).orElseThrow( () -> new RuntimeException("Cart Not Found"));
		
		List<CartItem> cartItems = cartItemRepository.findByCartId(cart.getCartId());
		
		if(cartItems.isEmpty()) {
			throw new RuntimeException("Cart has no items");
			
		}
		
		//create Order
		Orders order = new Orders();
		order.setUser(user);
		order.setOrderDateTime(LocalDateTime.now());
		order.setStatus(OrderStatus.PLACED);
		
		Orders savedOrder = orderRepository.save(order);
		
		//create OrderItems
		BigDecimal totalAmount = BigDecimal.ZERO;
		
		for(CartItem cartItem : cartItems) {
			
			OrderItem orderItem = new OrderItem();
			
			orderItem.setOrder(savedOrder);
			orderItem.setProduct(cartItem.getProduct());
			orderItem.setQuantity(cartItem.getQuantity());
			orderItem.setPrice(cartItem.getProduct().getPrice());
			
			totalAmount = totalAmount.add(
					cartItem.getProduct().getPrice()
					.multiply(BigDecimal.valueOf(cartItem.getQuantity()))
			);
			
			orderItemRepository.save(orderItem);
			
		}
		
		//create payment (Pending , Mode == null)
		
		Payment payment = new Payment();
		payment.setOrder(savedOrder);
        payment.setAmount(totalAmount);
        payment.setStatus(PaymentStatus.PENDING);
        payment.setMode(null);
        
        
        paymentRepository.save(payment);
        
        
        //clear cart 
        cartItemRepository.deleteByCartId(cart.getCartId());
        
        return Map.of(
        			"orderId" , savedOrder.getId(),
        			"orderStatus", savedOrder.getStatus(),
        			"paymentStatus", payment.getStatus(),
        			"ammount", totalAmount
        		);
        		
		
	}

}
