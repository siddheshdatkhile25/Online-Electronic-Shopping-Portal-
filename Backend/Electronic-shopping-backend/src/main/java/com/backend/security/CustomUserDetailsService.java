//package com.backend.security;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UserDetailsService;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import com.backend.user.Repository.UserRepository;
//import com.backend.user.entites.User;
//
//import java.util.List;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//
//
//@Service
//public class CustomUserDetailsService implements UserDetailsService {
//	
//	@Autowired
//	private UserRepository userRepo;
//	
//
//	@Override
//	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
//		
//		return userRepo.findByEmail(email)
//                .orElseThrow(() -> new UsernameNotFoundException("User Not Found"));
//	}
//
//}

package com.backend.security;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
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
    public UserDetails loadUserByUsername(String email)
            throws UsernameNotFoundException {

        // Fetch user from DB
        User user = userRepo.findByEmail(email)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User Not Found with email: " + email)
                );

        // Convert YOUR User entity into Spring Security UserDetails
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPasswordHash(),
                List.of(new SimpleGrantedAuthority("ROLE_" + user.getUserRole()))
        );
    }}
