package com.example.api.application.payment.edit;

import com.example.api.dto.ResultResponseDto;

public interface IPaymentEditInputPort {
    public ResultResponseDto handle(PaymentEditInputData inputData);
}
