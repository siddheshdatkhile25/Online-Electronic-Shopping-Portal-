package com.backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.backend.user.Repository.UserRepository;
import com.backend.user.entites.User;

@Service
public class CustomUserDetailsService implements UserDetailsService {
	
	@Autowired
	private UserRepository userRepo;
	

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		
		return userRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User Not Found"));
	}

}