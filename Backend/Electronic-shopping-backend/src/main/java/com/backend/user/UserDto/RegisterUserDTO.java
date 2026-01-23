package com.backend.user.UserDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class RegisterUserDTO {
	
	private String firstname;
    private String lastname;
    private String password;
    private String email;
    private String phone;

}
