package com.rmit.sept.monday15302.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.util.Date;

@Entity
public class WorkingHours {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="working_hours_id")
    private String id;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="admin_id", referencedColumnName="user_id")
    private AdminDetails admin_id;

    // 1 for Sunday, 2-6 for Monday-Friday
    @NotBlank
    @Min(1)
    @Max(7)
    @Column(name = "day")
    private int day;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    @Column(name="notified_date", nullable = false)
    private Date date;

    @JsonFormat(pattern="HH:mm:ss")
    @Temporal(TemporalType.TIME)
    @Column(name="start_time", nullable = false)
    private Date startTime;

    @JsonFormat(pattern="HH:mm:ss")
    @Temporal(TemporalType.TIME)
    @Column(name="end_time", nullable = false)
    private Date endTime;

    public String getId() { return id; }

    public AdminDetails getAdmin_id() { return admin_id; }

    public int getDay() { return day; }

    public Date getDate() { return date; }

    public Date getStartTime() { return startTime; }

    public Date getEndTime() { return endTime; }
}
