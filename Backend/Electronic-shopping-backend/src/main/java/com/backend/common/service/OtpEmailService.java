package com.backend.common.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service

public class OtpEmailService {
	
	@Autowired
	private JavaMailSender mailSender;
	
	public void sendOtpEmail(String toEmail , String otp) {
		
		SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject("Your OTP For Reset Password");
        message.setText(
            "Dear User,\n\n" +
            "Your OTP for account verification is: " + otp + "\n\n" +
            "This OTP is valid for 10 minutes.\n\n" +
            "Regards,\n" +
            "Your App Team"
        );
        
        mailSender.send(message);
	}

}
