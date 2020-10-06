package com.rmit.sept.monday15302.utils.Request;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class EditCustomer {
    @NotBlank(message = "Customer's first name is required")
    private String fName;

    @NotBlank(message = "Customer's last name is required")
    private String lName;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp="(^$|[0-9]{10})")
    private String phoneNumber;

    @NotBlank(message = "Email is required")
    @Size(max = 50)
    @Email
    private String email;

    @NotBlank(message = "Username is required")
    @Size(min = 3, max = 21)
    private String username;

    public EditCustomer(String username, String fName, String lName, String email,
                        String address, String phoneNumber) {
        this.username = username;
        this.fName = fName;
        this.lName = lName;
        this.email = email;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

    public EditCustomer() {

    }

    public String getfName() {
        return lName;
    }

    public String getlName() {
        return fName;
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

    public String getUsername() {
        return username;
    }

    public void setUserName(String username) {
        this.username = username;
    }
}
