package com.example.api.model;

import com.example.api.dto.AddingPaymentDto;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.util.Date;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Payment {
    @Id
    @GeneratedValue
    private Long id;

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

    public Payment(LocalDate date, String type, String category, String memo, Long price) {
        this.date = date;
        this.type = type;
        this.category = category;
        this.memo = memo;
        this.price = price;
    }
}
