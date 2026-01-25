package com.backend.user.UserDto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserListResponseDTO {

    private Long id;
    private String firstname;
    private String lastname;
    private String email;
    private String phone;
    private String userRole;
    private Boolean isActive;
}
