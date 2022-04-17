package com.example.api.application.payment.edit;

import com.example.api.dto.ResultResponseDto;
import com.example.api.repsitory.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PaymentEditInteractor implements IPaymentEditInputPort {

    private final PaymentRepository paymentRepository;

    @Override
    public ResultResponseDto handle(PaymentEditInputData inputData) {
        var addingPayment = inputData.getPayment();
        if(!paymentRepository.existsById(addingPayment.getId())){
            return new ResultResponseDto("ng", Optional.of("IDが一致する収支がないため編集できませんでした。"));
        }
        try {
            paymentRepository.save(addingPayment);
        } catch (Exception e) {
            return new ResultResponseDto("ng", Optional.of("編集できませんでした。"));
        }

        return new ResultResponseDto("ok", Optional.empty());
    }
}
