package com.backend.user.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
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
import com.backend.security.JwtUtil;
import com.backend.user.UserDto.ForgotPasswordRequestDTO;
import com.backend.user.UserDto.LoginRequestDTO;
import com.backend.user.UserDto.LoginResponseDTO;
import com.backend.user.UserDto.RegisterUserDTO;
import com.backend.user.UserDto.RegisterUserResponseDTO;
import com.backend.user.UserDto.ResetPasswordDTO;
import com.backend.user.UserDto.UpdateUserDTO;
import com.backend.user.UserDto.UserDetailsResponseDTO;
import com.backend.user.UserDto.UserListResponseDTO;
import com.backend.user.UserDto.VerifyOtpDTO;
import com.backend.user.entites.User;
import com.backend.user.service.UserService;

import jakarta.validation.Valid;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;


@RestController
@RequestMapping("/api/users")


public class UserController {
	
	@Autowired
	private UserService userService;
	
	//spring security
	@Autowired 
	private AuthenticationManager authenticationManager;
	
	@Autowired 
	private JwtUtil jwtUtil;
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequestDTO dto) {

	    try {
	        Authentication authToken =
	                new UsernamePasswordAuthenticationToken(
	                        dto.getEmail(), dto.getPassword());

	        Authentication authenticated =
	                authenticationManager.authenticate(authToken);

	        String jwt = jwtUtil.createToken(authenticated);

	        // ✅ DO NOT CAST principal to User entity
	        String email = authenticated.getName();

	        // fetch your JPA user explicitly
	        User user = userService.getUserByEmail(email);

	        return ResponseEntity.ok(
	                new LoginResponseDTO(
	                        jwt,
	                        user.getId(),
	                        user.getFirstname(),
	                        user.getLastname(),
	                        user.getEmail(),
	                        user.getUserRole()
	                ));

	    } catch (AuthenticationException e) {
	        return ResponseEntity.status(401).body("Invalid credentials");
	    }
	}

	
	
	@PostMapping("/register")
	public ResponseEntity<RegisterUserResponseDTO> registerUser(
	        @RequestBody RegisterUserDTO user) {

	    User savedUser = userService.registerUser(user);

	    RegisterUserResponseDTO  response =
	            new RegisterUserResponseDTO(
	                    savedUser.getId(),
	                    savedUser.getFirstname(),
	                    savedUser.getLastname(),
	                    savedUser.getEmail(),
	                    savedUser.getPhone(),
	                    savedUser.getUserRole()
	            );

	    return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}

	
	public String getAllUser() {
		return "Hello From Backend";
	}
	
	//update user 
	@GetMapping("/{id}")
	public ResponseEntity<ApiResponse<UserDetailsResponseDTO>> getUserById(
	        @PathVariable Long id) {

	    UserDetailsResponseDTO data = userService.getUserById(id);

	    ApiResponse<UserDetailsResponseDTO> response =
	            new ApiResponse<>("User details fetched successfully", data);

	    return ResponseEntity.ok(response);
	}
	
	@PutMapping("/{id}")
	public ResponseEntity<ApiResponse<UserDetailsResponseDTO>> updateUser(
	        @PathVariable Long id,
	        @Valid @RequestBody UpdateUserDTO dto) {

	    UserDetailsResponseDTO data = userService.updateUser(id, dto);

	    ApiResponse<UserDetailsResponseDTO> response =
	            new ApiResponse<>("User details updated successfully", data);

	    return ResponseEntity.ok(response);
	}
	
	
	
	//get All user For admin-side
	@GetMapping("/getUser")
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

	    try {
	    	userService.verifyOtp(dto.getEmail(), dto.getOtp());
		    return ResponseEntity.ok(
		            new ApiResponse<String>("OTP verified successfully", "success")
		    );
	    }catch(Exception ex) {
	    	
	    	return ResponseEntity
	    			.status(HttpStatus.BAD_REQUEST)
	    			.body(new ApiResponse<>("Invalid OTP", "error"));
	    }
	}
	
	@PostMapping("/reset-password")
	public ResponseEntity<ApiResponse> resetPassword(
	        @RequestBody ResetPasswordDTO dto) {

	    userService.resetPassword(dto);
	    return ResponseEntity.ok(
	            new ApiResponse("Password reset successfull", "success")
	    );
	}
	
	
	
	
	
	



}