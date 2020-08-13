package com.rmit.sept.monday15302.model;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Entity
@Table(name="user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="user_id")
    private Long id;

    @NotBlank(message = "User name is required")
    @Size(max = 21)
    @Column(name="user_name")
    private String userName;

    @NotBlank(message = "Password is required")
    @Column(name="password")
    private String password;

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

}
