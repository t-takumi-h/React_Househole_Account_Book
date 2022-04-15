package com.example.api.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Date;

@Getter
@Setter
@Entity
public class Payment {
    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private Date date;

    @NotNull
    private String type;

    @NotNull
    private String category;

    @NotNull
    @Size(max = 255)
    private String memo;

    @NotNull
    private Long price;
}
