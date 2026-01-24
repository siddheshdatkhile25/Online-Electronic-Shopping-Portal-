//package com.backend.user.controllers;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.data.domain.Page;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.backend.common.dtos.ApiResponse;
//import com.backend.user.UserDto.LoginRequestDTO;
//import com.backend.user.UserDto.LoginResponseDTO;
//import com.backend.user.UserDto.RegisterUserDTO;
//import com.backend.user.UserDto.UpdateUserDTO;
//import com.backend.user.UserDto.UserDetailsResponseDTO;
//import com.backend.user.UserDto.UserListResponseDTO;
//import com.backend.user.entites.User;
//import com.backend.user.service.UserService;
//
//import jakarta.validation.Valid;
//
//@RestController
//@RequestMapping("/users")
//
//
//public class UserController {
//	
//	@Autowired
//	private UserService userService;
//	
//	@GetMapping("/getUser")
//	public String getAllUser() {
//		return "Hello From Backend";
//	}
//	
//	@PostMapping("/register")
//	public ResponseEntity<User> registerUser(@RequestBody RegisterUserDTO user){
//		User savedUser = userService.registerUser(user);
//		
//		return new ResponseEntity<>(savedUser , HttpStatus.CREATED);
//	}
//	
//	@PostMapping("/login")
//	public ResponseEntity<ApiResponse<LoginResponseDTO>> login(
//	        @RequestBody LoginRequestDTO dto) {
//
//	    LoginResponseDTO data = userService.login(dto);
//
//	    ApiResponse<LoginResponseDTO> response =
//	            new ApiResponse<>("Login successful", data);
//
//	    return ResponseEntity.ok(response);
//	}
//	
//	@GetMapping("/{id}")
//	public ResponseEntity<ApiResponse<UserDetailsResponseDTO>> getUserById(
//	        @PathVariable Integer id) {
//
//	    UserDetailsResponseDTO data = userService.getUserById(id);
//
//	    ApiResponse<UserDetailsResponseDTO> response =
//	            new ApiResponse<>("User details fetched successfully", data);
//
//	    return ResponseEntity.ok(response);
//	}
//	
//	@PutMapping("/{id}")
//	public ResponseEntity<ApiResponse<UserDetailsResponseDTO>> updateUser(
//	        @PathVariable Integer id,
//	        @Valid @RequestBody UpdateUserDTO dto) {
//
//	    UserDetailsResponseDTO data = userService.updateUser(id, dto);
//
//	    ApiResponse<UserDetailsResponseDTO> response =
//	            new ApiResponse<>("User details updated successfully", data);
//
//	    return ResponseEntity.ok(response);
//	}
//	
//	
//	
//	@GetMapping
//	public ResponseEntity<ApiResponse<Page<UserListResponseDTO>>> getAllUsers(
//	        @RequestParam(defaultValue = "0") int page,
//	        @RequestParam(defaultValue = "10") int size) {
//
//	    Page<UserListResponseDTO> users = userService.getAllUsers(page, size);
//
//	    ApiResponse<Page<UserListResponseDTO>> response =
//	            new ApiResponse<>("Users fetched successfully", users);
//
//	    return ResponseEntity.ok(response);
//	}
//
//	
//	
//	
//	
//
//	
//	
//
//	
//	
//	
//	
//
//
//}
