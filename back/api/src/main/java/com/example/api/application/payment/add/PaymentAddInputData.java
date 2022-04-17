package com.example.api.application.payment.add;

import com.example.api.dto.AddingPaymentDto;
import com.example.api.model.Payment;
import lombok.Getter;


@Getter
public class PaymentAddInputData {

    private AddingPaymentDto payment;

    public PaymentAddInputData(AddingPaymentDto payment) {
        this.payment = payment;
    }
}
