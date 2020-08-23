package com.rmit.sept.monday15302.model;

import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="admin_details")
public class AdminDetails {
    @Id
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    @MapsId
    @NotFound(action= NotFoundAction.IGNORE)
    private User user;

    @NotBlank(message = "Business owner's name is required")
    @Column(name="admin_name")
    private String adminName;
    
    @NotBlank(message = "Service is required")
    @Column(name="service")
    private String service;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "admin")
    private List<WorkerDetails> workerList = new ArrayList<WorkerDetails>();

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "admin_id")
    private List<WorkingHours> workingHoursList = new ArrayList<WorkingHours>();

    public AdminDetails() {

    }
}
