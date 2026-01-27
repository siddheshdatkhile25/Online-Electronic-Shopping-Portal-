package com.backend.order.Service;

import java.util.List;

import com.backend.order.DTO.MyOrderResponse;

public interface OrderService {
	Object placeOrder(Long userId);
	
	List<MyOrderResponse> getMyOrders(Long userId);

}
