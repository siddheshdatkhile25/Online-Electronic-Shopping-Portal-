package com.backend.user.service;

import java.time.LocalDateTime;
import java.util.List;

import org.hibernate.Hibernate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.backend.common.service.OtpEmailService;
import com.backend.user.Repository.PasswordResetOtpRepository;
import com.backend.user.Repository.UserRepository;
import com.backend.user.UserDto.RegisterUserDTO;
import com.backend.user.UserDto.ResetPasswordDTO;
import com.backend.user.UserDto.UpdateUserDTO;
import com.backend.user.UserDto.UserAddressDTO;
import com.backend.user.UserDto.UserDetailsResponseDTO;
import com.backend.user.UserDto.UserListResponseDTO;
import com.backend.user.entites.PasswordResetOtp;
import com.backend.user.entites.User;
import com.backend.user.entites.UserAddress;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    @Autowired
    private final UserRepository userRepo;
    @Autowired
    private final PasswordResetOtpRepository otpRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private OtpEmailService otpEmailService;
    

    @Override
    public User registerUser(RegisterUserDTO dto) {
        if (userRepo.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already registered");
        }

        User user = new User();
        user.setFirstname(dto.getFirstname());
        user.setLastname(dto.getLastname());
        user.setEmail(dto.getEmail());
        user.setPhone(dto.getPhone());
        user.setUserRole("USER");

        
        user.setPasswordHash(passwordEncoder.encode(dto.getPassword()));

        // Save addresses if present
        if (dto.getAddress() != null) {
            UserAddress address = new UserAddress();
            address.setAddressLine1(dto.getAddress().getAddressLine1());
            address.setAddressLine2(dto.getAddress().getAddressLine2());
            address.setCity(dto.getAddress().getCity());
            address.setDistrict(dto.getAddress().getDistrict());
            address.setState(dto.getAddress().getState());
            address.setPincode(dto.getAddress().getPincode());
            address.setUser(user);
            user.getAddresses().add(address);
        }

        return userRepo.save(user);
    }

    
    @Override
    public UserDetailsResponseDTO getUserById(Long id) {

        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));

        // Initialize addresses collection using Hibernate.initialize()
        Hibernate.initialize(user.getAddresses());

        return new UserDetailsResponseDTO(
                user.getId(),
                user.getFirstname(),
                user.getLastname(),
                user.getEmail(),
                user.getPhone(),
                user.getAddresses()
        );
    }
    
    @Override
    public UserDetailsResponseDTO updateUser(Long id, UpdateUserDTO dto) {

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

        // Initialize addresses collection using Hibernate.initialize()
        Hibernate.initialize(updatedUser.getAddresses());

        return new UserDetailsResponseDTO(
                updatedUser.getId(),
                updatedUser.getFirstname(),
                updatedUser.getLastname(),
                updatedUser.getEmail(),
                updatedUser.getPhone(),
                updatedUser.getAddresses()
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
    
    @Override
        public void forgotPassword(String email) {
                // Generate OTP and save, user variable not needed
                String otp = String.valueOf((int)(Math.random() * 90000) + 10000);
                PasswordResetOtp resetOtp = new PasswordResetOtp();
                resetOtp.setEmail(email);
                resetOtp.setOtp(otp);
                resetOtp.setExpiryTime(LocalDateTime.now().plusMinutes(10));
                resetOtp.setUsed(false);
                otpRepo.save(resetOtp);
                // Simulate sending email
                System.out.println("OTP for password reset: " + otp);
                otpEmailService.sendOtpEmail(email, otp);
        }
    
    
    @Override
    public void verifyOtp(String email, String otp) {

        PasswordResetOtp resetOtp =
                otpRepo.findByEmailAndOtpAndUsedFalse(email, otp)
                .orElseThrow(() -> new RuntimeException("Invalid OTP"));

        if (resetOtp.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP expired");
        }
    }
    
    @Override
    public void resetPassword(ResetPasswordDTO dto) {

        PasswordResetOtp resetOtp =
                otpRepo.findByEmailAndOtpAndUsedFalse(
                        dto.getEmail(), dto.getOtp())
                .orElseThrow(() -> new RuntimeException("Invalid OTP"));

        if (resetOtp.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP expired");
        }

        User user = userRepo.findByEmail(dto.getEmail())
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPasswordHash(passwordEncoder.encode(dto.getNewPassword()));
        userRepo.save(user);

        resetOtp.setUsed(true);
        otpRepo.save(resetOtp);
    }


    @Override
    public User getUserByEmail(String email) {
            return userRepo.findByEmail(email)
                            .orElseThrow(() -> new RuntimeException("User not found"));
    }
    
    @Override
    public void addUserAddress(UserAddressDTO dto, String email) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserAddress address = new UserAddress();
        address.setAddressLine1(dto.getAddressLine1());
        address.setAddressLine2(dto.getAddressLine2());
        address.setCity(dto.getCity());
        address.setDistrict(dto.getDistrict());
        address.setState(dto.getState());
        address.setPincode(dto.getPincode());
        address.setUser(user); // Set the user reference

        user.getAddresses().add(address);
        userRepo.save(user); // cascade saves address
    }
    
    @Override
    public List<UserAddressDTO> getUserAddresses(String email) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return user.getAddresses().stream()
                .map(addr -> new UserAddressDTO(
                		addr.getId(),
                        addr.getAddressLine1(),
                        addr.getAddressLine2(),
                        addr.getCity(),
                        addr.getDistrict(),
                        addr.getState(),
                        addr.getPincode()
                ))
                .toList();
    }
    
    @Override
    public void deleteUserAddress(Long addressId, String email) {

        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

                // Remove address by id
                List<UserAddress> addresses = user.getAddresses();
                boolean removed = false;
                for (int i = 0; i < addresses.size(); i++) {
                        if (addresses.get(i).getId().equals(addressId)) {
                                addresses.remove(i);
                                removed = true;
                                break;
                        }
                }
                if (!removed) {
                        throw new RuntimeException("Address not found");
                }
                userRepo.save(user); // orphanRemoval deletes address
    }


}
