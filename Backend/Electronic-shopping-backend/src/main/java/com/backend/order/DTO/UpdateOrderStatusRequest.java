package com.backend.order.DTO;

import com.backend.common.Enums.OrderStatus;

import lombok.Data;

@Data
public class UpdateOrderStatusRequest {
private OrderStatus status;
}
