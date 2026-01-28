package com.backend.payment.Conroller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.payment.DTO.SetPaymentModeRequest;
import com.backend.payment.Service.PaymentService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;

    @PutMapping("/{orderId}/mode")
    public ResponseEntity<?> setPaymentMode(
    		
            @PathVariable Long orderId,
            @RequestBody SetPaymentModeRequest request
    ) {
    	System.out.println(orderId);
    	System.out.println(request.getPaymentMode());
        return ResponseEntity.ok(
        		
                paymentService.setPaymentMode(orderId, request)
        );
    }
    
    
}


//Confirm Payment API this for COD payment Confirmation


