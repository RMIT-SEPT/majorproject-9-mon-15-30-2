package com.rmit.sept.monday15302.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;

import java.text.ParseException;
import java.text.SimpleDateFormat;
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

    public void setDate(String date) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        Date newDate = sdf.parse(date);
        this.date = newDate;
    }

    public void setStartTime(String startTime) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
        Date newTime = sdf.parse(startTime);
        this.startTime = newTime;
    }

    public void setEndTime(String startTime) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
        Date newTime = sdf.parse(startTime);
        this.endTime = newTime;
    }

    public void setId(String id)
    {
        this.id = id;
    }

    public void setAdminId(AdminDetails id)
    {
        admin_id = id;
    }

    public void setDay(int day)
    {
        this.day = day;
    }
}
