package com.example.api.application.payment.find;

import com.example.api.model.Payment;
import com.example.api.repsitory.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PaymentFindInteractor implements IPaymentFindInputPort{

    private final PaymentRepository paymentRepository;

    @Override
    public List<Payment> handle(PaymentFindByYearMonthInputData inputData) {
        var findingYearMonth = inputData.getYearMonth();
        var startDate = findingYearMonth.atDay(1);
        var endDate = findingYearMonth.atEndOfMonth();
        return paymentRepository.findByDateBetween(startDate, endDate);
    }

    @Override
    public List<Payment> handle(PaymentFindAllInputData inputData) {
        return paymentRepository.findAll();
    }
}
