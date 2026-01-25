package com.backend.order.Repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.order.entites.OrderItem;

@Repository
public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {

    // Get all items of an order
    List<OrderItem> findByOrderId(Integer orderId);

    // Optional: bulk delete when order is cancelled
    void deleteByOrderId(Integer orderId);
}

