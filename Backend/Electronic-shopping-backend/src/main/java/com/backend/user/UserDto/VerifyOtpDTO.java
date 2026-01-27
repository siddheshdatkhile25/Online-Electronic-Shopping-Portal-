package com.backend.user.UserDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyOtpDTO {
    private String email;
    private String otp;
}

