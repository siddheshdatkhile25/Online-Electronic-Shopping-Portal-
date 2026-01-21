package com.backend.user.service;

import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.user.Repository.UserRepository;
import com.backend.user.UserDto.LoginRequestDTO;
import com.backend.user.UserDto.LoginResponseDTO;
import com.backend.user.UserDto.RegisterUserDTO;
import com.backend.user.UserDto.UserDetailsResponseDTO;
import com.backend.user.entites.User;
import com.backend.user.service.UserService;  // ✅ MUST be this


import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepo;

    //@Autowired
    //private PasswordEncoder passwordEncoder;

    @Override
    public User registerUser(RegisterUserDTO dto) {

        if (userRepo.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        
        User user = new User();
        user.setFirstname(dto.getFirstname());
        user.setLastname(dto.getLastname());
        user.setPasswordHash(dto.getPassword());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        
        

        //user.setPasswordHash(passwordEncoder.encode(user.getPasswordHash()));
        user.setUserRole("USER");
        User savedUser = userRepo.save(user); 
        return savedUser;
    }
    
    @Override
    public LoginResponseDTO login(LoginRequestDTO dto) {

        User user = userRepo.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        // since security is OFF, plain password comparison
        if (!user.getPasswordHash().equals(dto.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        return new LoginResponseDTO(
        		user.getId(),
                user.getFirstname(),
                user.getLastname()
        );
    }
    
    @Override
    public UserDetailsResponseDTO getUserById(Integer id) {

        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        return new UserDetailsResponseDTO(
                user.getId(),
                user.getFirstname(),
                user.getLastname(),
                user.getEmail(),
                user.getPhone(),
                user.getUserRole()
        );
    }

}
