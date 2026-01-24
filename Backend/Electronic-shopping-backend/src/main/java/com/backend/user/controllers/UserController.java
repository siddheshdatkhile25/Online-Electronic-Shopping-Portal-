package com.backend.user.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.backend.common.dtos.ApiResponse;
import com.backend.user.UserDto.ForgotPasswordRequestDTO;
import com.backend.user.UserDto.LoginRequestDTO;
import com.backend.user.UserDto.LoginResponseDTO;
import com.backend.user.UserDto.RegisterUserDTO;
import com.backend.user.UserDto.ResetPasswordDTO;
import com.backend.user.UserDto.UpdateUserDTO;
import com.backend.user.UserDto.UserDetailsResponseDTO;
import com.backend.user.UserDto.UserListResponseDTO;
import com.backend.user.UserDto.UserResponseDTO;
import com.backend.user.UserDto.VerifyOtpDTO;
import com.backend.user.entites.User;
import com.backend.user.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")


public class UserController {
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/getUser")
	public String getAllUser() {
		return "Hello From Backend";
	}
	
	@PostMapping("/register")
	public ResponseEntity<ApiResponse<UserResponseDTO>> registerUser(@RequestBody RegisterUserDTO user){
		try {
			User savedUser = userService.registerUser(user);
			
			UserResponseDTO responseDTO = new UserResponseDTO(
		            savedUser.getId(),
		            savedUser.getFirstname(),
		            savedUser.getLastname(),
		            savedUser.getEmail(),
		            savedUser.getPhone()
		    );
			
			ApiResponse<UserResponseDTO> response = new ApiResponse<UserResponseDTO>("Registration Successfull" , responseDTO);
			
			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		}catch(RuntimeException ex) {
			ApiResponse<UserResponseDTO> errorResponse =
	                new ApiResponse<>(ex.getMessage(), null);
			
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponse);
		}catch (Exception ex) {

	        ApiResponse<UserResponseDTO> errorResponse =
	                new ApiResponse<>("Internal server error", null);

	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                .body(errorResponse);
	    }
	}
	
	@PostMapping("/login")
	public ResponseEntity<ApiResponse<LoginResponseDTO>> login(
	        @RequestBody LoginRequestDTO dto) {

	    LoginResponseDTO data = userService.login(dto);

	    ApiResponse<LoginResponseDTO> response =
	            new ApiResponse<>("Login successful", data);

	    return ResponseEntity.ok(response);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<ApiResponse<UserDetailsResponseDTO>> getUserById(
	        @PathVariable Integer id) {

	    UserDetailsResponseDTO data = userService.getUserById(id);

	    ApiResponse<UserDetailsResponseDTO> response =
	            new ApiResponse<>("User details fetched successfully", data);

	    return ResponseEntity.ok(response);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<ApiResponse<UserDetailsResponseDTO>> updateUser(
	        @PathVariable Integer id,
	        @Valid @RequestBody UpdateUserDTO dto) {

	    UserDetailsResponseDTO data = userService.updateUser(id, dto);

	    ApiResponse<UserDetailsResponseDTO> response =
	            new ApiResponse<>("User details updated successfully", data);

	    return ResponseEntity.ok(response);
	}
	
	
	
	@GetMapping
	public ResponseEntity<ApiResponse<Page<UserListResponseDTO>>> getAllUsers(
	        @RequestParam(defaultValue = "0") int page,
	        @RequestParam(defaultValue = "10") int size) {

	    Page<UserListResponseDTO> users = userService.getAllUsers(page, size);

	    ApiResponse<Page<UserListResponseDTO>> response =
	            new ApiResponse<>("Users fetched successfully", users);

	    return ResponseEntity.ok(response);
	}
	
	
	@PostMapping("/forgot-password")
	public ResponseEntity<ApiResponse<String>> forgotPassword(
	        @Valid @RequestBody ForgotPasswordRequestDTO dto) {

	    userService.forgotPassword(dto.getEmail());

	    return ResponseEntity.ok(
	            new ApiResponse<>("OTP sent to registered email", null)
	    );
	}

	
	@PostMapping("/verify-otp")
	public ResponseEntity<ApiResponse<String>> verifyOtp(
	        @RequestBody VerifyOtpDTO dto) {

	    userService.verifyOtp(dto.getEmail(), dto.getOtp());
	    return ResponseEntity.ok(
	            new ApiResponse<>("OTP verified successfully", null)
	    );
	}
	
	@PostMapping("/reset-password")
	public ResponseEntity<ApiResponse<String>> resetPassword(
	        @RequestBody ResetPasswordDTO dto) {

	    userService.resetPassword(dto);
	    return ResponseEntity.ok(
	            new ApiResponse<>("Password reset successful", null)
	    );
	}

	

	

	
	
	

	
	
	
	

	
	

	
	
	
	


}
