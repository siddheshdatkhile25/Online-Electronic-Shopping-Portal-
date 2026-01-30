package com.backend.payment.Service;

import java.util.Map;

import org.springframework.stereotype.Service;

import com.backend.payment.DTO.RazorpayVerifyRequest;
import com.backend.payment.DTO.SetPaymentModeRequest;


public interface PaymentService {
	Object setPaymentMode(Long OrderId , SetPaymentModeRequest request);
	
	public Map<String, Object> createRazorpayOrder(Long orderId) throws Exception;
	public String verifyRazorpayPayment(Long orderId , RazorpayVerifyRequest request) throws Exception;
}
