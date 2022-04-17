package com.example.api.application.payment.add;

import com.example.api.dto.ResultResponseDto;
import com.example.api.model.Payment;
import com.example.api.repsitory.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PaymentAddInteractor implements IPaymentAddInputPort {

    private final PaymentRepository paymentRepository;

    @Override
    public ResultResponseDto handle(PaymentAddInputData inputData) {
        var addingPaymentDto = inputData.getPayment();
        var addingPayment = addingPaymentDto.createPaymentInstance();

        try {
            paymentRepository.save(addingPayment);
        } catch (Exception e) {
            return new ResultResponseDto("ng", Optional.of("保存できませんでした。"));
        }

        return new ResultResponseDto("ok", Optional.empty());
    }
}
