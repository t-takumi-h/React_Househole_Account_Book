package com.example.api.application.payment.delete;

import com.example.api.dto.ResultResponseDto;
import com.example.api.model.Payment;
import com.example.api.repsitory.PaymentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PaymentDeleteInteractor implements IPaymentDeleteInputPort{

    private final PaymentRepository paymentRepository;

    @Override
    public ResultResponseDto handle(PaymentDeleteByIdInputData inputData) {
        var deletingId = inputData.getId();
        if (paymentRepository.existsById(deletingId)) {
            paymentRepository.deleteById(deletingId);
            return new ResultResponseDto("ok", Optional.empty());
        }
        return new ResultResponseDto("ng", Optional.of("IDの一致する収支がありませんでした。"));
    }
}
