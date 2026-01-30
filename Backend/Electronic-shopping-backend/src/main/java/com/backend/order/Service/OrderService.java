package com.backend.order.Service;

import java.util.List;

import com.backend.common.Enums.OrderStatus;
import com.backend.order.DTO.AdminOrderResponse;
import com.backend.order.DTO.MyOrderResponse;

public interface OrderService {
	Object placeOrder(Long userAddress , Long userId);
	
	List<MyOrderResponse> getMyOrders(Long userId);
	
	List<AdminOrderResponse> getAllOrdersForAdmin();
	//admin update order status
	void updateOrderStatus(Long orderId, OrderStatus status);
	
	Object getOrderDetails(Long orderId);

}