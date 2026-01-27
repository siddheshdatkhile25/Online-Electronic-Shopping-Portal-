package com.backend.user.UserDto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordDTO {
    private String email;
    private String otp;
    private String newPassword;
}
