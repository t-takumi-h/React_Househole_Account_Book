package com.example.api.controller;

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
public class PaymentsController {
    private final PaymentRepository paymentRepository;

    @Operation(summary = "収支を全件取得します")
    @PostMapping("/find")
    List<Payment> findAll() { return paymentRepository.findAll();}

    @Operation(summary = "収支を登録します")
    @PostMapping("/save")
    Payment save(@RequestBody Payment payment) { return paymentRepository.save(payment);}


}
