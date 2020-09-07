package com.rmit.sept.monday15302.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.NotFound;
import org.hibernate.annotations.NotFoundAction;

import javax.persistence.*;
import javax.validation.constraints.Email;
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

    @NotBlank(message = "Phone number is required")
    @Size(min = 8, max = 15)
    @Column(name="phone_number")
    private String phoneNumber;

    @NotBlank(message = "Email is required")
    @Column(name = "email")
    @Size(max = 50)
    @Email
    private String email;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @OneToMany(fetch = FetchType.LAZY, mappedBy = "customer")
    private List<Booking> bookingLists = new ArrayList<>();

    public CustomerDetails() {

    }

    public CustomerDetails(User user, String fname, String lname, String address,
                           String phoneNumber, String email) {
        this.user = user;
        this.fName = fname;
        this.lName = lname;
        this.address = address;
        this.phoneNumber = phoneNumber;
        this.email = email;
    }

    public String getId() { return id; }

    public String getfName() { return fName; }

    public String getlName() { return lName; }

    public String getAddress() { return address; }

    public String getPhoneNumber() { return phoneNumber; }

    public String getEmail() { return email; }

    public void setId(String id) {
        this.id = id;
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

    public void setAddress(String address) {
        this.address = address;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    @Override
    public boolean equals(Object o) {
        CustomerDetails c = (CustomerDetails) o;
        return id.equals(c.getId()) && fName.equals(c.getfName())
                && lName.equals(c.getlName()) && address.equals(c.getAddress())
                && phoneNumber.equals(c.getPhoneNumber())
                && email.equals(c.getEmail());
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (id != null ? id.hashCode() : 0);
        result = 31 * result + (fName != null ? fName.hashCode() : 0);
        result = 31 * result + (lName != null ? lName.hashCode() : 0);
        result = 31 * result + (address != null ? address.hashCode() : 0);
        result = 31 * result + (phoneNumber != null ? phoneNumber.hashCode() : 0);
        result = 31 * result + (email != null ? email.hashCode() : 0);

        return result;
    }
}
