package com.backend.payment.Service;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.backend.common.Enums.OrderStatus;
import com.backend.order.Repository.OrderRepository;
import com.backend.order.entites.Orders;
import com.backend.order.entites.Payment;
import com.backend.payment.DTO.SetPaymentModeRequest;
import com.backend.payment.Repository.PaymentRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;


@Service
@Transactional
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

	private final PaymentRepository paymentRepository;
    private final OrderRepository orderRepository;

    @Override
    public Object setPaymentMode(Long orderId, SetPaymentModeRequest request) {

        //Fetch order
        Orders order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        // Validate order state
        if (!OrderStatus.PLACED.equals(order.getStatus())) {
            throw new RuntimeException("Payment mode cannot be changed");
        }

        // Fetch payment
        Payment payment = paymentRepository.findByOrder_Id(orderId)
                .orElseThrow(() -> new RuntimeException("Payment not found"));

        // Set payment mode
        payment.setMode(request.getPaymentMode());

        paymentRepository.save(payment);

        // Response
        return Map.of(
                "orderId", orderId,
                "paymentMode", payment.getMode(),
                "message", "Payment mode set successfully"
        );
    }

}
