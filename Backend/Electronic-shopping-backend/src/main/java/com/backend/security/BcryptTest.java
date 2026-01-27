package com.backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import jakarta.annotation.PostConstruct;

@Component
public class BcryptTest {

    @Autowired
    PasswordEncoder encoder;

    @PostConstruct
    public void run() {
        System.out.println(encoder.encode("admin123"));
    }
}
