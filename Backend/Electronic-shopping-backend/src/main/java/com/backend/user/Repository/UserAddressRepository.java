package com.backend.user.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.user.entites.User;
import com.backend.user.entites.UserAddress;

@Repository
public interface UserAddressRepository extends JpaRepository<UserAddress, Long> {

    // Get all addresses of a user
    List<UserAddress> findByUser(User user);

    // Get all addresses of a user by userId
    List<UserAddress> findByUser_Id(Long userId);

    // Get a specific address of a user (IMPORTANT for place order)
    Optional<UserAddress> findByIdAndUser_Id(Long addressId, Long userId);

}
