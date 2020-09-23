package com.rmit.sept.monday15302.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Arrays;
import java.util.Collection;

@Entity
@Table(name="user")
public class User implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private String id;

    @NotBlank(message = "User name is required")
    @Size(max = 21, min = 3)
    @Column(name="user_name")
    private String userName;

    @NotBlank(message = "Password is required")
    @Column(name="password")
    private String password;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name="user_type")
    private UserType type;

    @OneToOne(mappedBy = "user")
    private CustomerDetails customerDetails;

    @OneToOne(mappedBy = "user")
    private WorkerDetails workerDetails;

    @OneToOne(mappedBy = "user")
    private AdminDetails adminDetails;

    public User() {

    }

    public User(String username, String password, UserType type) {
        this.userName = username;
        this.password = password;
        this.type = type;
    }

    public User(String id, String username, String password, UserType type) {
        this.id = id;
        this.userName = username;
        this.password = password;
        this.type = type;
    }

    public String getId() {
        return id;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Arrays.asList(
                new SimpleGrantedAuthority(type.toString()));
    }

    public String getPassword() { return password; }

    @Override
    public String getUsername() {
        return userName;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return password;
    }

    public UserType getType() {
        return type;
    }
}
