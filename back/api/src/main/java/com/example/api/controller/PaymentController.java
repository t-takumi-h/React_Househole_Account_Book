package com.example.api.controller;

import com.example.api.application.payment.add.IPaymentAddInputPort;
import com.example.api.application.payment.add.PaymentAddInputData;
import com.example.api.application.payment.delete.IPaymentDeleteInputPort;
import com.example.api.application.payment.delete.PaymentDeleteByIdInputData;
import com.example.api.application.payment.edit.IPaymentEditInputPort;
import com.example.api.application.payment.edit.PaymentEditInputData;
import com.example.api.application.payment.find.IPaymentFindInputPort;
import com.example.api.application.payment.find.PaymentFindAllInputData;
import com.example.api.application.payment.find.PaymentFindByYearMonthInputData;
import com.example.api.dto.AddingPaymentDto;
import com.example.api.dto.IdDto;
import com.example.api.dto.ResultResponseDto;
import com.example.api.dto.YearMonthDto;
import com.example.api.model.Payment;
import com.example.api.repsitory.PaymentRepository;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api/v1/payment")
@RequiredArgsConstructor
@RestController
@CrossOrigin(origins = "*")
public class PaymentController {
    private final IPaymentFindInputPort paymentFindInputPort;
    private final IPaymentAddInputPort paymentAddInputPort;
    private final IPaymentEditInputPort paymentEditInputPort;
    private final IPaymentDeleteInputPort paymentDeleteInputPort;

    @Operation(summary = "収支を全件取得します")
    @PostMapping("/find")
    List<Payment> findAll() { return paymentFindInputPort.handle(new PaymentFindAllInputData()); }

    @Operation(summary = "指定した年月月の収支を取得します")
    @PostMapping("/find-by-year-month")
    List<Payment> findByMonth(@RequestBody YearMonthDto yearMonth) {
        var findingYearMonth = java.time.YearMonth.parse(yearMonth.getYearMonth());
        var paymentFindByYearMonthInput = new PaymentFindByYearMonthInputData(findingYearMonth);
        return paymentFindInputPort.handle(paymentFindByYearMonthInput);
    }

    @Operation(summary = "収支を登録します")
    @PostMapping("/add")
    ResultResponseDto save(@RequestBody AddingPaymentDto payment) {
        var paymentAddInputData = new PaymentAddInputData(payment);
        return paymentAddInputPort.handle(paymentAddInputData);
    }

    @Operation(summary = "収支を編集します")
    @PostMapping("/edit")
    ResultResponseDto edit(@RequestBody Payment payment) {
        var paymentEditInputData = new PaymentEditInputData(payment);
        return paymentEditInputPort.handle(paymentEditInputData);
    }

    @Operation(summary = "収支を削除します")
    @PostMapping("/delete")
    ResultResponseDto delete(@RequestBody IdDto id) {
        var paymentDeleteByIdInputData = new PaymentDeleteByIdInputData(id.getId());
        return paymentDeleteInputPort.handle(paymentDeleteByIdInputData);
    }


}
