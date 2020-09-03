package com.rmit.sept.monday15302.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
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
    private String id;

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

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "admin")
    private List<WorkerDetails> workerList = new ArrayList<>();

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "admin_id")
    private List<WorkingHours> workingHoursList = new ArrayList<>();

    public AdminDetails() {

    }

    public AdminDetails(String id, String name, String service) {
        this.id = id;
        this.adminName = name;
        this.service = service;
    }

    public String getId() { return id; }

    public String getAdminName() { return adminName; }

    public String getService() { return service; }

    public void setId(String id) {
        this.id = id;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setAdminName(String name) {
        this.adminName = name;
    }

    public void setService(String service) {
        this.service = service;
    }
}
