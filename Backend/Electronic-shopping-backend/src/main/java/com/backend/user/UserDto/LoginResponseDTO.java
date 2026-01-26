package com.backend.user.UserDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class LoginResponseDTO {
    private String token;
    private Long userId;  // Renamed from 'id' to match frontend expectation (response.userId)
    private String firstname;
    private String lastname;
    private String userRole;  // Uncommented and added
}