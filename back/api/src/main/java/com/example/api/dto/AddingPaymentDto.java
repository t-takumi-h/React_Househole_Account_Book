package com.example.api.dto;

import com.example.api.model.Payment;
import lombok.Getter;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;

@Getter
@Setter
public class AddingPaymentDto {
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    @NotNull
    private LocalDate date;

    @NotNull
    private String type;

    @NotNull
    private String category;

    @NotNull
    @Size(max = 255)
    private String memo;

    @NotNull
    private Long price;

    public Payment createPaymentInstance(){
        return new Payment(this.date, this.type, this.category, this.memo, this.price);
    }
}
