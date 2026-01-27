package com.backend.order.Controller.User;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.order.Service.OrderService;

import io.swagger.v3.oas.annotations.parameters.RequestBody;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
public class OrderController {
	
	private final OrderService orderService;

    @PostMapping("/place/{userId}")
    public ResponseEntity<?> placeOrder(@PathVariable Long userId) {
        return ResponseEntity.ok(orderService.placeOrder(userId));
        
    }
    
    @GetMapping("/my-orders/{userId}")
    public ResponseEntity<?> getMyOrders(@PathVariable Long userId){
    	return ResponseEntity.ok(orderService.getMyOrders(userId));
    }
    
    
}
