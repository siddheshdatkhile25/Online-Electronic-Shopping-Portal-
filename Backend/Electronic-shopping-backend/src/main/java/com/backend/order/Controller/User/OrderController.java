package com.backend.order.Controller.User;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.order.DTO.PlaceOrderRequest;
import com.backend.order.Service.OrderService;


import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
	
	private final OrderService orderService;

    @PostMapping("/place")
    public ResponseEntity<?> placeOrder(@RequestBody PlaceOrderRequest request) {
    	System.out.println("userId = " + request.getUserId());
    	System.out.println("addressId = " + request.getAddressId());

        return ResponseEntity.ok(orderService.placeOrder(request.getAddressId() , request.getUserId()));
    }
    
    @GetMapping("/my-orders/{userId}")
    public ResponseEntity<?> getMyOrders(@PathVariable Long userId){
    	return ResponseEntity.ok(orderService.getMyOrders(userId));
    }
    
    @GetMapping
    public ResponseEntity<?> getAllOrders() {
        return ResponseEntity.ok(orderService.getAllOrdersForAdmin());
    }
    
    
    
}
