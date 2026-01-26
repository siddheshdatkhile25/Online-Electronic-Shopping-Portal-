package com.backend.order.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.order.entites.Orders;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Long>{
	
    // Get all orders of a user
    List<Orders> findByUserIdOrderByOrderDateTimeDesc(Long userId);
    
    // Optional: get single order of a user (security-safe)
    Orders findByIdAndUserId(Long orderId, Long userId);
    
}
