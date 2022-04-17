package com.example.api.application.payment.find;

import com.example.api.model.Payment;

import java.util.List;

public interface IPaymentFindInputPort {
    public List<Payment> handle(PaymentFindByYearMonthInputData inputData);
    public List<Payment> handle(PaymentFindAllInputData inputData);

}
