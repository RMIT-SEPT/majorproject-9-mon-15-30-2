package com.rmit.sept.monday15302.utils.Request;

import com.rmit.sept.monday15302.model.UserType;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.*;

public class CustomerSignup {
    @NotBlank
    @Size(min = 3, max = 21)
    private String username;

    @NotNull
    @Enumerated(EnumType.STRING)
    private UserType type;

    @NotBlank(message = "Password is required")
    private String password;

    @NotBlank(message = "Confirmed password is required")
    private String confirmPassword;

    @NotBlank(message = "Customer's first name is required")
    private String fname;

    @NotBlank(message = "Customer's last name is required")
    private String lname;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp="(^$|[0-9]{10})")
    private String phoneNumber;

    @NotBlank(message = "Email is required")
    @Size(max = 50)
    @Email
    private String email;

    public CustomerSignup(String username, String password, UserType type, String fname, String lname,
                          String address, String phoneNumber, String email, String confirmPassword) {
        this.username = username;
        this.password = password;
        this.type = type;
        this.fname = fname;
        this.lname = lname;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.confirmPassword = confirmPassword;
    }

    public CustomerSignup() {

    }

    public CustomerSignup(String username, String password, UserType type, String lname,
                          String fname, String address, String phoneNumber, String email) {
        this.username = username;
        this.password = password;
        this.type = type;
        this.fname = fname;
        this.lname = lname;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public UserType getType() {
        return type;
    }

    public String getFname() {
        return fname;
    }

    public String getLname() {
        return lname;
    }

    public String getAddress() {
        return address;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public String getEmail() {
        return email;
    }

    public String getConfirmPassword() {
        return this.confirmPassword;
    }

    public void setPassword(String s) {
        this.password = s;
    }

    public void setConfirmPassword(String s) {
        this.confirmPassword = s;
    }
}
