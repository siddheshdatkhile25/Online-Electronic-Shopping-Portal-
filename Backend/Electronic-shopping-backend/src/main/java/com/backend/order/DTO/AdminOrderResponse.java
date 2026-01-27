package com.backend.order.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.backend.common.Enums.OrderStatus;
import com.backend.common.Enums.PaymentMode;
import com.backend.common.Enums.PaymentStatus;
import com.backend.order.entites.OrderAddress;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminOrderResponse {

    private Long orderId;
    private LocalDateTime orderDate;

    // User
    private String userName;

    // Delivery
    private OrderAddress deliveryAddress;

    // Order details
    private OrderStatus orderStatus;
    private BigDecimal totalAmount;

    // Payment
    private PaymentStatus paymentStatus;
    private PaymentMode paymentMode;

    // Items
    private List<AdminOrderItemResponse> items;
}
