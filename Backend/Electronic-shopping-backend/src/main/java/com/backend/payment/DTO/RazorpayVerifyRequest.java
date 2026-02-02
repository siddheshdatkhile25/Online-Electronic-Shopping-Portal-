package com.backend.payment.DTO;


import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RazorpayVerifyRequest {

    private String razorpayOrderId;
    private String razorpayPaymentId;
    private String razorpaySignature;
}

