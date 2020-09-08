package com.rmit.sept.monday15302.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
@Table(name="user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private String id;

    @NotBlank(message = "User name is required")
    @Size(max = 21)
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

    public String getId() {
        return id;
    }

    public String getUserName() { return userName; }

    public String getPassword() { return password; }

    public UserType getType() { return type; }

    public void setId(String id) {
        this.id = id;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setType(UserType type) {
        this.type = type;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
