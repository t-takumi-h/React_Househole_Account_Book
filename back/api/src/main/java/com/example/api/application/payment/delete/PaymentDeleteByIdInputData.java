package com.example.api.application.payment.delete;

import lombok.Getter;


@Getter
public class PaymentDeleteByIdInputData {

    private Long id;

    public PaymentDeleteByIdInputData(Long id) {
        this.id = id;
    }
}
