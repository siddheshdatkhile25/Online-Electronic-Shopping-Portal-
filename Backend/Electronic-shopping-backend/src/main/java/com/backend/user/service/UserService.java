package com.backend.user.service;

import org.springframework.data.domain.Page;

import com.backend.user.UserDto.LoginRequestDTO;
import com.backend.user.UserDto.LoginResponseDTO;
import com.backend.user.UserDto.RegisterUserDTO;
import com.backend.user.UserDto.ResetPasswordDTO;
import com.backend.user.UserDto.UpdateUserDTO;
import com.backend.user.UserDto.UserDetailsResponseDTO;
import com.backend.user.UserDto.UserListResponseDTO;
import com.backend.user.entites.User;

public interface UserService {

    User registerUser(RegisterUserDTO user);
    
    
    UserDetailsResponseDTO getUserById(Integer id);
    
    UserDetailsResponseDTO updateUser(Integer id , UpdateUserDTO dto);
    
    Page<UserListResponseDTO> getAllUsers(int page , int size);
    
    void forgotPassword(String email);

    void verifyOtp(String email, String otp);

    void resetPassword(ResetPasswordDTO dto);

    
}
