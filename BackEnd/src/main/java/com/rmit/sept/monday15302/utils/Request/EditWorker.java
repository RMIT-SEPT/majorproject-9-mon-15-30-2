package com.rmit.sept.monday15302.utils.Request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

public class EditWorker {

    @NotBlank(message = "User name is required")
    @Size(max = 21)
    private String userName;

    @NotBlank(message = "Password is required")
    private String password;

    @NotBlank(message = "Worker's first name is required")
    private String fName;

    @NotBlank(message = "Worker's last name is required")
    private String lName;

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp="(^$|[0-9]{10})")
    private String phoneNumber;

    public EditWorker(String username, String password, String fName,
                String lName, String phoneNumber) {
        this.userName = username;
        this.password = password;
        this.fName = fName;
        this.lName = lName;
        this.phoneNumber = phoneNumber;
    }

    public String getUsername() {
        return userName;
    }

    public String getfName() {
        return fName;
    }

    public String getlName() {
        return lName;
    }

    public String getPassword() {
        return password;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }
}

