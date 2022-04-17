package com.example.api.application.payment.delete;

import com.example.api.application.payment.find.PaymentFindByYearMonthInputData;
import com.example.api.dto.ResultResponseDto;
import com.example.api.model.Payment;

import java.util.List;

public interface IPaymentDeleteInputPort {
    public ResultResponseDto handle(PaymentDeleteByIdInputData inputData);
}
