package com.backend.user.UserDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserResponseDTO {

    private Long userId;
    private String firstname;
    private String lastname;
    private String email;
    private String phone;
}
