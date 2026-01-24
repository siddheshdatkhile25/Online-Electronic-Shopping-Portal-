package com.backend.user.UserDto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class RegisterUserResponseDTO {

    private Integer id;
    private String firstname;
    private String lastname;
    private String email;
    private String phone;
    private String userRole;
}
