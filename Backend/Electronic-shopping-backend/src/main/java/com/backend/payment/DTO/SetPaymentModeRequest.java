package com.backend.payment.DTO;

import com.backend.common.Enums.PaymentMode;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SetPaymentModeRequest {
    private PaymentMode paymentMode;
}
