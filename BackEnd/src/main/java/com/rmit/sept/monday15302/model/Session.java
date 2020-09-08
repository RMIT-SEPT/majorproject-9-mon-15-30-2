package com.rmit.sept.monday15302.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
@Table(name = "session")
public class Session {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="session_id")
    private String session_id;

    @NotNull
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="worker_id", referencedColumnName="user_id", nullable = false)
    private WorkerDetails worker;

    // 1 for Sunday, 2-6 for Monday-Friday
    @NotNull(message = "Day is required (1 for Sunday, 2-6 for Monday-Friday)")
    @Min(1)
    @Max(7)
    @Column(name = "day")
    private int day;

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

    public int getDay() {
        return this.day;
    }

    public Date getStartTime() {
        return this.startTime;
    }

    public Date getEndTime() {
        return this.endTime;
    }

    public String getService() {
        return this.service;
    }

    public WorkerDetails getWorker() {
        return worker;
    }

    public void setWorker(WorkerDetails worker) {
        this.worker = worker;
    }

}
