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
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "admin", orphanRemoval = true)
    private List<WorkerDetails> workerList = new ArrayList<>();

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "admin_id", orphanRemoval = true)
    private List<WorkingHours> workingHoursList = new ArrayList<>();

    public AdminDetails() {

    }

    public AdminDetails(String name, String service, User user) {
        this.adminName = name;
        this.service = service;
        this.user = user;
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

    @Override
    public boolean equals(Object o) {
        AdminDetails a = (AdminDetails) o;
        return id.equals(a.getId()) && adminName.equals(a.getAdminName())
                && service.equals(a.getService());
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (id != null ? id.hashCode() : 0);
        result = 31 * result + (adminName != null ? adminName.hashCode() : 0);
        result = 31 * result + (service != null ? service.hashCode() : 0);

        return result;
    }
}
