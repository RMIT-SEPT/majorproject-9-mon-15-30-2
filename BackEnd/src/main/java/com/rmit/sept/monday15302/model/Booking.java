package com.rmit.sept.monday15302.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
@Table(name="booking")
public class Booking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="booking_id")
    private String id;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="customer_id", referencedColumnName="user_id")
    private CustomerDetails customer;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="work_id", referencedColumnName="user_id")
    private WorkerDetails worker;

    @Enumerated(EnumType.STRING)
    @Column(name="booking_status")
    private BookingStatus status;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    @Column(name="date", nullable = false)
    private Date date;

    @JsonFormat(pattern="HH:mm:ss")
    @Temporal(TemporalType.TIME)
    @Column(name="start_time", nullable = false)
    private Date startTime;

    @JsonFormat(pattern="HH:mm:ss")
    @Temporal(TemporalType.TIME)
    @Column(name="end_time", nullable = false)
    private Date endTime;

    @NotBlank(message = "Service is required")
    @Column(name="service")
    private String service;

    public Booking() {}

    public String getId() { return id; }

    public CustomerDetails getCustomer() {
        return customer;
    }

    public WorkerDetails getWorker() {
        return worker;
    }

    public Date getDate() {
        return date;
    }

    public BookingStatus getStatus() {
        return status;
    }

    public Date getStartTime() {
        return startTime;
    }

    public Date getEndTime() {
        return endTime;
    }

    public String getService() {
        return service;
    }

}
