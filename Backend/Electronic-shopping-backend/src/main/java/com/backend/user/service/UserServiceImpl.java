package com.backend.user.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.user.Repository.UserRepository;
import com.backend.user.UserDto.LoginRequestDTO;
import com.backend.user.UserDto.LoginResponseDTO;
import com.backend.user.UserDto.RegisterUserDTO;
import com.backend.user.UserDto.UpdateUserDTO;
import com.backend.user.UserDto.UserDetailsResponseDTO;
import com.backend.user.UserDto.UserListResponseDTO;
import com.backend.user.entites.User;
import com.backend.user.service.UserService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User registerUser(RegisterUserDTO dto) {

        if (userRepo.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        
        User user = new User();
        user.setFirstname(dto.getFirstname());
        user.setLastname(dto.getLastname());
        
        user.setPasswordHash(passwordEncoder.encode(dto.getPassword()));
        
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        
        user.setUserRole("USER");
        User savedUser = userRepo.save(user); 
        return savedUser;
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
    
    @Override
    public UserDetailsResponseDTO updateUser(Integer id, UpdateUserDTO dto) {

        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        // email uniqueness check
        if (!user.getEmail().equals(dto.getEmail())
                && userRepo.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already in use");
        }

        user.setFirstname(dto.getFirstname());
        user.setLastname(dto.getLastname());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());

        User updatedUser = userRepo.save(user);

        return new UserDetailsResponseDTO(
                updatedUser.getId(),
                updatedUser.getFirstname(),
                updatedUser.getLastname(),
                updatedUser.getEmail(),
                updatedUser.getPhone(),
                updatedUser.getUserRole()
        );
    }
    
    @Override
    public Page<UserListResponseDTO> getAllUsers(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        return userRepo.findAll(pageable)
                .map(user -> new UserListResponseDTO(
                        user.getId(),
                        user.getFirstname(),
                        user.getLastname(),
                        user.getEmail(),
                        user.getPhone(),
                        user.getUserRole(),
                        user.getIsActive()
                ));
    }
    
}
