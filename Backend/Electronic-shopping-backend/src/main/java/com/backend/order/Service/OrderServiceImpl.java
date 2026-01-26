//package com.backend.order.Service;
//
//
//
//import java.math.BigDecimal;
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.Map;
//
//import org.apache.catalina.security.SecurityUtil;
//import org.springframework.stereotype.Service;
//
//import com.backend.cart.entity.Cart;
//import com.backend.cart.entity.CartItem;
//import com.backend.cart.repository.CartItemRepository;
//import com.backend.cart.repository.CartRepository;
//import com.backend.common.Enums.OrderStatus;
//import com.backend.common.Enums.PaymentStatus;
//import com.backend.order.DTO.MyOrderResponse;
//import com.backend.order.DTO.OrderItemResponse;
//import com.backend.order.Repository.OrderItemRepository;
//import com.backend.order.Repository.OrderRepository;
//import com.backend.order.entites.OrderItem;
//import com.backend.order.entites.Orders;
//import com.backend.order.entites.Payment;
//import com.backend.payment.Repository.PaymentRepository;
//import com.backend.product.controller.customer.CustomerProductController;
//import com.backend.product.entity.Product;
//import com.backend.product.repository.ProductRepository;
//import com.backend.security.CustomUserDetailsService;
//import com.backend.user.Repository.UserRepository;
//import com.backend.user.entites.User;
//
//import jakarta.transaction.Transactional;
//import lombok.RequiredArgsConstructor;
//
//@Service
//@RequiredArgsConstructor
//@Transactional
//public class OrderServiceImpl implements OrderService {
//
//
//
//	private final CartRepository cartRepository;
//	private final CartItemRepository cartItemRepository;
//	private final OrderRepository orderRepository;
//	private final OrderItemRepository orderItemRepository;
//	private final UserRepository userRepository;
//	private final PaymentRepository paymentRepository;
//	private final ProductRepository productRepository;
//
//
//    
//
//   
//	
//	@Override
//	public Object placeOrder(Long userId) {
//		
//		//logged-in user
//		User user = userRepository.findById(userId).orElseThrow( () -> new RuntimeException("User Not Found"));
//		
//		
//		//fetch cart
//		Cart cart = cartRepository.findByUser(user).orElseThrow( () -> new RuntimeException("Cart Not Found"));
//		
//		List<CartItem> cartItems = cartItemRepository.findByCart_CartId(cart.getCartId());
//		
//		if(cartItems.isEmpty()) {
//			throw new RuntimeException("Cart has no items");
//			
//		}
//		
//		//create Order
//		Orders order = new Orders();
//		order.setUser(user);
//		order.setOrderDateTime(LocalDateTime.now());
//		order.setStatus(OrderStatus.PLACED);
//		
//		Orders savedOrder = orderRepository.save(order);
//		
//		//create OrderItems
//		BigDecimal totalAmount = BigDecimal.ZERO;
//		
//		for(CartItem cartItem : cartItems) {
//			
//			Product product = cartItem.getProduct();
//			
//			//check Stock
//			if(product.getStock() < cartItem.getQuantity()) {
//				throw new RuntimeException(
//						"Insufficent stock for product : " + product.getName()
//						);
//			}
//			
//			//Deduct Stock
//			product.setStock(
//					product.getStock() - cartItem.getQuantity()
//					);
//			
//			productRepository.save(product);
//			
//			
//			//Create OrderItems
//			OrderItem orderItem = new OrderItem();
//			
//			orderItem.setOrder(savedOrder);
//			orderItem.setProduct(cartItem.getProduct());
//			orderItem.setQuantity(cartItem.getQuantity());
//			orderItem.setPrice(cartItem.getProduct().getPrice());
//			
//			totalAmount = totalAmount.add(
//					cartItem.getProduct().getPrice()
//					.multiply(BigDecimal.valueOf(cartItem.getQuantity()))
//			);
//			
//			orderItemRepository.save(orderItem);
//			
//		}
//		
//		//create payment (Pending , Mode == null)
//		
//		
//		
//		Payment payment = new Payment();
//		payment.setOrder(savedOrder);
//        payment.setAmount(totalAmount);
//        payment.setStatus(PaymentStatus.PENDING);
//        payment.setMode(null);
//        
//        
//        paymentRepository.save(payment);
//        
//        
//        //clear cart 
//        cartItemRepository.deleteByCart_CartId(cart.getCartId());
//        
//        return Map.of(
//        			"orderId" , savedOrder.getId(),
//        			"orderStatus", savedOrder.getStatus(),
//        			"paymentStatus", payment.getStatus(),
//        			"ammount", totalAmount
//        		);
//        		
//		
//	}
//	
//	@Override
//    public List<MyOrderResponse> getMyOrders(Long userId) {
//
//        //Get logged-in user from JWT
//        //Long userId = SecurityUtil.getCurrentUserId();
//
//        // Fetch orders
//        List<Orders> orders =
//                orderRepository.findByUserIdOrderByOrderDateTimeDesc(userId);
//
//        // Map to response DTO
//        return orders.stream().map(order -> {
//
//            Payment payment = paymentRepository
//                    .findByOrderId(order.getId())
//                    .orElseThrow(() -> new RuntimeException("Payment not found"));
//            
//         // Order Items
//            List<OrderItem> orderItems =
//                    orderItemRepository.findByOrderId(order.getId());
//
//            List<OrderItemResponse> itemResponses =
//                    orderItems.stream().map(item -> {
//                        OrderItemResponse dto = new OrderItemResponse();
//                        dto.setProductId(item.getProduct().getId());
//                        dto.setProductName(item.getProduct().getName());
//                        dto.setQuantity(item.getQuantity());
//                        dto.setPrice(item.getPrice());
//                        dto.setProductImage(item.getProduct().getImgUrl());
//                        return dto;
//                    }).toList();
//
//            MyOrderResponse response = new MyOrderResponse();
//            response.setOrderId(order.getId());
//            response.setOrderDateTime(order.getOrderDateTime());
//            response.setOrderStatus(order.getStatus());
//            response.setPaymentStatus(payment.getStatus());
//            response.setAmount(payment.getAmount());
//            response.setItems(itemResponses);
//            
//            
//            return response;
//            
//
//        }).toList();
//        
//        
//    }
//
//}
