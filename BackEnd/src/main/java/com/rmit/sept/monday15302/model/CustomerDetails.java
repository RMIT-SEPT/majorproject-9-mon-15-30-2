package com.rmit.sept.monday15302.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="customer_details")
public class CustomerDetails {
    @Id
    private String id;

    @OneToOne
    @JoinColumn(name = "user_id")
    @MapsId
    @NotFound(action= NotFoundAction.IGNORE)
    private User user;

    @NotBlank(message = "Customer's first name is required")
    @Column(name="customer_fname")
    private String fName;

    @NotBlank(message = "Customer's last name is required")
    @Column(name="customer_lname")
    private String lName;

    @NotBlank(message = "Address is required")
    @Column(name="address")
    private String address;

    @Size(min = 8, max = 15)
    @Column(name="phone_number")
    private int phoneNumber;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "customer")
    private List<Booking> bookingLists = new ArrayList<>();

    public CustomerDetails() {

    }

    public String getId() { return id; }

    public String getfName() { return fName; }

    public String getlName() { return lName; }

    public String getAddress() { return address; }

    public int getPhoneNumber() { return phoneNumber; }

}
