package com.backend.payment.Conroller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.payment.DTO.RazorpayVerifyRequest;
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
    
    // ONLINE: create Razorpay order
    @PostMapping("/{orderId}/razorpay/order")
    public ResponseEntity<?> createRazorpayOrder(@PathVariable Long orderId) throws Exception {
        return ResponseEntity.ok(
                paymentService.createRazorpayOrder(orderId)
        );
    }
    
    @PostMapping("/{orderId}/razorpay/verify")
    public ResponseEntity<?> verifyRazorpayPayment(
            @PathVariable Long orderId,
            @RequestBody RazorpayVerifyRequest request
    ) throws Exception {
        return ResponseEntity.ok(
                paymentService.verifyRazorpayPayment(orderId, request)
        );
    }

    
    
    
    
}


//Confirm Payment API this for COD payment Confirmation


