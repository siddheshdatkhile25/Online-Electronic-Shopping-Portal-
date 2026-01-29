package com.backend.order.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.common.Enums.OrderStatus;
import com.backend.order.Service.OrderService;

import lombok.RequiredArgsConstructor;
@PreAuthorize("hasRole('ADMIN')")
@RestController
@RequestMapping("/admin/orders")
@RequiredArgsConstructor
public class AdminOrderController {
	private final OrderService orderService;
	 @GetMapping
	    public ResponseEntity<?> getAllOrders() {
	        return ResponseEntity.ok(orderService.getAllOrdersForAdmin());
	    }
	 
	 @PutMapping("/{orderId}/status")
	 public ResponseEntity<?> updateOrderStatus(@PathVariable Long orderId,@RequestParam OrderStatus status){
		 orderService.updateOrderStatus(orderId, status);
	        return ResponseEntity.ok("Order status updated successfully"); 
	 }

}
