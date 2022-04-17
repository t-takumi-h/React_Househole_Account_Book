package com.example.api.repsitory;

import com.example.api.model.Payment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findByDateBetween(LocalDate date1, LocalDate date2);
}
