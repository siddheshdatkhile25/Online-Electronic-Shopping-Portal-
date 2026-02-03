package com.backend.common.Enums;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

import lombok.Getter;

@Getter
public enum CustomException {

    REVIEW_ALREADY_EXISTS_EXCEPTION(
            "Review Already Exists",
            "You have already reviewed this product"
    );
	
	

    private final String message;
    private final String description;
    private final LocalDateTime time;

    CustomException(String message, String description) {
        this.message = message;
        this.description = description;
        this.time = ZonedDateTime
                .now(ZoneId.of("Asia/Kolkata"))
                .toLocalDateTime();
    }
}
