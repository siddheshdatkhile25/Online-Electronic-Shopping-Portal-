package com.backend.user.entites;


import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.backend.common.entites.BaseEntity;

import jakarta.persistence.AttributeOverride;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Index;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "users",
indexes= {
		@Index(name = "idx_user_email", columnList = "email", unique = true)
})
@AttributeOverride(name = "id", column = @Column(name = "user_id"))
@NoArgsConstructor
@Getter
@Setter
@ToString(exclude = {"passwordHash"})

public class User extends BaseEntity implements UserDetails {

    private String firstname;
    private String lastname;

    @Column(unique = true, nullable = false)
    private String email;

    private String passwordHash;
    private String phone;

    @Column(name = "user_role")
    private String userRole;

    private Boolean isActive = true;

    private String extra1;
    private String extra2;
    private String extra3;

    // UserDetails METHODS
    

    @OneToMany(
    	    cascade = CascadeType.ALL,
    	    orphanRemoval = true //Safe deletes
    	)
    @JoinColumn(name = "user_id")
    private List<UserAddress> addresses = new ArrayList<>();


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + userRole));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return Boolean.TRUE.equals(isActive);
    }

    @Override 
    public String getPassword() {
        return passwordHash;
    }
    
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }


}