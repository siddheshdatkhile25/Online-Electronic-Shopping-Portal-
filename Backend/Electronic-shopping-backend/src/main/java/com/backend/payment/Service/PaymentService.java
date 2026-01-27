package com.backend.payment.Service;

import org.springframework.stereotype.Service;

import com.backend.payment.DTO.SetPaymentModeRequest;


public interface PaymentService {
	Object setPaymentMode(Long OrderId , SetPaymentModeRequest request);
}
