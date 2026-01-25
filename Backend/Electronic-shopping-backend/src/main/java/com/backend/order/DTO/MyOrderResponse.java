package com.backend.order.DTO;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.backend.common.Enums.OrderStatus;
import com.backend.common.Enums.PaymentStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MyOrderResponse {
	private Long orderId;
    private LocalDateTime orderDateTime;
    private OrderStatus orderStatus;
    private PaymentStatus paymentStatus;
    private BigDecimal amount;
    
    private List<OrderItemResponse> items;
    
}


