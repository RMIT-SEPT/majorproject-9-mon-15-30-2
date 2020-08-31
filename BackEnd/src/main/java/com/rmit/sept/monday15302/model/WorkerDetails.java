package com.rmit.sept.monday15302.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="worker_details")
public class WorkerDetails {
    @Id
    private String id;

    @OneToOne
    @JoinColumn(name = "user_id")
    @MapsId
    @NotFound(action= NotFoundAction.IGNORE)
    private User user;

    @NotBlank(message = "Worker's first name is required")
    @Column(name="worker_fname")
    private String fName;

    @NotBlank(message = "Worker's last name is required")
    @Column(name="worker_lname")
    private String lName;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="admin_id", referencedColumnName="user_id")
    private AdminDetails admin;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "worker")
    private List<Booking> bookingList = new ArrayList<>();

    public WorkerDetails() {

    }

    public WorkerDetails(String id, String fName, String lName, AdminDetails admin) {
        this.id = id;
        this.fName = fName;
        this.lName = lName;
        this.admin = admin;
    }

    public String getId() { return id; }

    public String getfName() { return fName; }

    public String getlName() { return lName; }

    public AdminDetails getAdmin() { return admin; }
}
