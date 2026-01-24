package com.backend.user.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.backend.user.entites.PasswordResetOtp;

public interface PasswordResetOtpRepository extends JpaRepository<PasswordResetOtp , Integer>{
	Optional<PasswordResetOtp> findByEmailAndOtpAndUsedFalse(
            String email, String otp);
}
