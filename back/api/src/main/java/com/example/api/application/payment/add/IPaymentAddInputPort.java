package com.example.api.application.payment.add;

import com.example.api.dto.ResultResponseDto;

public interface IPaymentAddInputPort {
    public ResultResponseDto handle(PaymentAddInputData inputData);
}
