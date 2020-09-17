package com.rmit.sept.monday15302.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
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

    @NotBlank(message = "Phone number is required")
    @Pattern(regexp="(^$|[0-9]{10})")
    @Column(name="phone_number")
    private String phoneNumber;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="admin_id", referencedColumnName="user_id", nullable = false)
    private AdminDetails admin;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "worker", orphanRemoval = true)
    private List<Booking> bookingList = new ArrayList<>();

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "worker", orphanRemoval = true)
    private List<Session> sessions = new ArrayList<>();

    public WorkerDetails() {

    }

    public WorkerDetails(User user, String fName, String lName, AdminDetails admin,
                         String phoneNumber) {
        this.user = user;
        this.fName = fName;
        this.lName = lName;
        this.admin = admin;
        this.phoneNumber = phoneNumber;
    }

    public String getId() { return id; }

    public String getfName() { return fName; }

    public String getlName() { return lName; }

    public AdminDetails getAdmin() { return admin; }

    public void setId(String id) {
        this.id = id;
    }

    public void setAdmin(AdminDetails admin) {
        this.admin = admin;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public void setfName(String fname) {
        this.fName = fname;
    }

    public void setlName(String lname) {
        this.lName = lname;
    }

    @Override
    public boolean equals(Object o) {
        WorkerDetails w = (WorkerDetails) o;
        return id.equals(w.getId()) && fName.equals(w.getfName())
                && lName.equals(w.getlName()) && admin.equals(w.getAdmin())
                && phoneNumber.equals(w.getPhoneNumber());
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (id != null ? id.hashCode() : 0);
        result = 31 * result + (fName != null ? fName.hashCode() : 0);
        result = 31 * result + (lName != null ? lName.hashCode() : 0);
        result = 31 * result + (admin != null ? admin.hashCode() : 0);
        result = 31 * result + (phoneNumber != null ? phoneNumber.hashCode() : 0);

        return result;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
