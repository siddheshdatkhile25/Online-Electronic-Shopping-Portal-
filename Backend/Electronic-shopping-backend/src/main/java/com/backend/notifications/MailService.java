package com.backend.notifications;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.retry.annotation.Recover;
import org.springframework.retry.annotation.Retryable;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.retry.annotation.Backoff;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MailService {
	
	private final JavaMailSender mailSender;
	@Value("${app.mail.from}")
	private String senderEmail;
	  @Async
	    @Retryable(
	        value = MailException.class,
	        maxAttempts = 3,
	        backoff = @Backoff(delay = 2000) // 2 seconds gap
	    )  //with 2 sec gap
	public void sendEmail(String to,String subject,String body){
		SimpleMailMessage message=new SimpleMailMessage();
		message.setTo(to);
		message.setSubject(subject);
		message.setText(body);
		message.setFrom(senderEmail);
		mailSender.send(message);
	}
	
	//recovery handler
	 // Called after retries exhausted
    @Recover
    public void recover(MailException ex, String to, String subject, String body) {
        System.err.println("Email failed after retries for: " + to);
      
    }
	

}
