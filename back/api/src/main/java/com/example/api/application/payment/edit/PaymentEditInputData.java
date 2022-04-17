package com.example.api.application.payment.edit;

import com.example.api.model.Payment;
import lombok.Getter;


@Getter
public class PaymentEditInputData {

    private Payment payment;

    public PaymentEditInputData(Payment payment) {
        this.payment = payment;
    }
}
