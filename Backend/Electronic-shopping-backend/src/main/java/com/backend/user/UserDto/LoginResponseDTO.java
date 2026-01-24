package com.backend.user.UserDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor

public class LoginResponseDTO {
	
	private String token;
	private Integer id;
    private String firstname;
    private String lastname;
}
