package com.backend.user.entites;

import com.backend.common.entites.BaseEntity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "user_addresses")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@AttributeOverride(name = "id", column = @Column(name = "address_id"))
public class UserAddress extends BaseEntity {

    

    

    // Line 1: Room no, Floor, Building
    @Column(name = "address_line_1", nullable = false, length = 150)
    private String addressLine1;

    // Line 2: Street, Area
    @Column(name = "address_line_2", nullable = false, length = 150)
    private String addressLine2;

    // Line 3: Town, City
    @Column(name = "city", nullable = false, length = 100)
    private String city;

    // District
    @Column(name = "district", nullable = false, length = 100)
    private String district;

    // State
    @Column(name = "state", nullable = false, length = 100)
    private String state;

    // Pincode
    @Column(name = "pincode", nullable = false, length = 6)
    private String pincode;


}
