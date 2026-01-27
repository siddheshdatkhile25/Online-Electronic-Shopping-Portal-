package com.backend.user.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.backend.user.UserDto.LoginRequestDTO;
import com.backend.user.UserDto.LoginResponseDTO;
import com.backend.user.UserDto.RegisterUserDTO;
import com.backend.user.UserDto.ResetPasswordDTO;
import com.backend.user.UserDto.UpdateUserDTO;
import com.backend.user.UserDto.UserAddressDTO;
import com.backend.user.UserDto.UserDetailsResponseDTO;
import com.backend.user.UserDto.UserListResponseDTO;
import com.backend.user.entites.User;

public interface UserService {

    User registerUser(RegisterUserDTO user);
    
    UserDetailsResponseDTO getUserById(Long id);
    

    UserDetailsResponseDTO updateUser(Long id , UpdateUserDTO dto);
    
    Page<UserListResponseDTO> getAllUsers(int page , int size);
    
    void forgotPassword(String email);

    void verifyOtp(String email, String otp);

    void resetPassword(ResetPasswordDTO dto);


	User getUserByEmail(String username);
	
	void addUserAddress(UserAddressDTO dto, String email);

    List<UserAddressDTO> getUserAddresses(String email);
    
    void deleteUserAddress(Long addressId, String email);

    
}
