package com.example.api.dto;

import lombok.Getter;

import java.util.Optional;

@Getter
public class ResultResponseDto {
    private String result;
    private Optional<String> message;

    public ResultResponseDto(String result, Optional<String> message) {
        this.result = result;
        this.message = message;
    }
}
