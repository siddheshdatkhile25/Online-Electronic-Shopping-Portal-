package com.backend.user.UserDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class UserDetailsResponseDTO {

    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String phone;
    private String userRole;
    
}
