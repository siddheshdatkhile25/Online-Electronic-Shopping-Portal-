package com.backend.user.controllers;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.backend.user.UserDto.UserAddressDTO;
import com.backend.user.service.UserServiceImpl;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/users/addresses")
@RequiredArgsConstructor
public class UserAddressController {

    private final UserServiceImpl userService;

    @PostMapping
    public ResponseEntity<Void> addAddress(
            @RequestBody UserAddressDTO dto,
            Authentication auth
    ) {
    	System.out.println(dto);
        userService.addUserAddress(dto, auth.getName());
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public List<UserAddressDTO> getAddresses(Authentication auth) {
        return userService.getUserAddresses(auth.getName());
    }
    
    @DeleteMapping("/{addressId}")
    public ResponseEntity<Void> deleteAddress(
            @PathVariable Long addressId,
            Authentication auth
    ) {
        userService.deleteUserAddress(addressId, auth.getName());
        return ResponseEntity.ok().build();
    }

}

