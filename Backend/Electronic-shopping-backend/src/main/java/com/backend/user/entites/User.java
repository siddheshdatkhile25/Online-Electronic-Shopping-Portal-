package com.backend.user.entites;

import com.backend.common.entites.BaseEntity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "users")

@AttributeOverride(name = "id", column = @Column(name = "user_id"))
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = {"passwordHash"})
public class User extends BaseEntity{
	
	private String firstname;
    private String lastname;
    private String email;
    private String passwordHash;
    private String phone;
    @Column(name = "user_role")
    private String userRole;
    private Boolean isActive = true;
    
    private String extra1;
    private String extra2;
    
    private String extra3;
    
}
