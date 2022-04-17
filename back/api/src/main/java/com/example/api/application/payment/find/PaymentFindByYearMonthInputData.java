package com.example.api.application.payment.find;

import lombok.Getter;

import java.time.YearMonth;

@Getter
public class PaymentFindByYearMonthInputData {

    private YearMonth yearMonth;

    public PaymentFindByYearMonthInputData(YearMonth yearMonth) {
        this.yearMonth = yearMonth;
    }
}
