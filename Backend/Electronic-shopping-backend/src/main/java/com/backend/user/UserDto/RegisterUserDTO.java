package com.backend.user.UserDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@AllArgsConstructor
@ToString
public class RegisterUserDTO {
	private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String phone;
    private String password;

    // Only ONE address during registration
    private UserAddressDTO address;


}
