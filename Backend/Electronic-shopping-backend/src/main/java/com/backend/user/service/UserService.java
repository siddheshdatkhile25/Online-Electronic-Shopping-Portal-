package com.backend.user.service;

import com.backend.user.UserDto.LoginRequestDTO;
import com.backend.user.UserDto.LoginResponseDTO;
import com.backend.user.UserDto.RegisterUserDTO;
import com.backend.user.UserDto.UserDetailsResponseDTO;
import com.backend.user.entites.User;

public interface UserService {

    public User registerUser(RegisterUserDTO user);
    
    LoginResponseDTO login(LoginRequestDTO dto);
    
    UserDetailsResponseDTO getUserById(Integer id);
    
    
}
