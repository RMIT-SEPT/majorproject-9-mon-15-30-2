package com.rmit.sept.monday15302.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.rmit.sept.monday15302.utils.Utility;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.text.ParseException;
import java.util.Date;

@Entity
@Table(name="booking")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="booking_id")
    private String id;

    @NotNull
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="customer_id", referencedColumnName="user_id", nullable = false)
    private CustomerDetails customer;

    @NotNull
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="worker_id", referencedColumnName="user_id", nullable = false)
    private WorkerDetails worker;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name="booking_status")
    private BookingStatus status;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name="confirmation")
    private Confirmation confirmation;

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

    public Booking(String i, CustomerDetails c, WorkerDetails w, BookingStatus bs,
                   String s, Confirmation confirmation) {
        id = i;
        customer = c;
        worker = w;
        status = bs;
        service = s;
        this.confirmation = confirmation;
    }

    public Booking(String s, CustomerDetails customer, WorkerDetails worker, BookingStatus status,
                   String date, String startTime, String endTime, String service, Confirmation c)
            throws ParseException {
        id = s;
        this.customer = customer;
        this.worker = worker;
        this.status = status;
        this.setDate(date);
        this.setStartTime(startTime);
        this.setEndTime(endTime);
        this.service = service;
        this.confirmation = c;
    }

    public Booking(CustomerDetails customer, WorkerDetails worker, BookingStatus status,
                   String date, String startTime, String endTime, String service, Confirmation c)
            throws ParseException {
        this.customer = customer;
        this.worker = worker;
        this.status = status;
        this.setDate(date);
        this.setStartTime(startTime);
        this.setEndTime(endTime);
        this.service = service;
        this.confirmation = c;
    }

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

    public void setCustomer(CustomerDetails customer) {
        this.customer = customer;
    }

    public void setWorker(WorkerDetails worker) {
        this.worker = worker;
    }

    public void setStatus(BookingStatus status) {
        this.status = status;
    }

    public void setService(String service) {
        this.service = service;
    }

    public void setDate(String date) throws ParseException {
        this.date = Utility.convertStringToDate(date);
    }

    public void setStartTime(String startTime) throws ParseException {
        this.startTime = Utility.convertStringToTime(startTime);
    }

    public void setEndTime(String endTime) throws ParseException {
        this.endTime = Utility.convertStringToTime(endTime);
    }

    public void setId(String id) {
        this.id = id;
    }

    @Override
    public boolean equals(Object o) {
        Booking b = (Booking) o;
        return id.equals(b.getId()) && customer.equals(b.getCustomer())
                && worker.equals(b.getWorker()) && status.equals(b.getStatus())
                && date.getTime() == b.getDate().getTime() && service.equals(b.getService())
                && startTime.getTime() == b.getStartTime().getTime()
                && endTime.getTime() == b.getEndTime().getTime()
                && confirmation.equals(b.getConfirmation());
    }

    public Confirmation getConfirmation() {
        return confirmation;
    }

    @Override
    public int hashCode() {
        int result = id != null ? id.hashCode() : 0;
        result = 31 * result + (id != null ? id.hashCode() : 0);
        result = 31 * result + (customer != null ? customer.hashCode() : 0);
        result = 31 * result + (worker != null ? worker.hashCode() : 0);
        result = 31 * result + (status != null ? status.hashCode() : 0);
        result = 31 * result + (date != null ? date.hashCode() : 0);
        result = 31 * result + (service != null ? service.hashCode() : 0);
        result = 31 * result + (startTime != null ? startTime.hashCode() : 0);
        result = 31 * result + (endTime != null ? endTime.hashCode() : 0);
        result = 31 * result + (confirmation != null ? confirmation.hashCode() : 0);

        return result;
    }

    public void setConfirmation(Confirmation confirm) {
        this.confirmation = confirm;
    }
}
