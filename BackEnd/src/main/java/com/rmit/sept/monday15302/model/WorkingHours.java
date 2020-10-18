package com.rmit.sept.monday15302.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.rmit.sept.monday15302.utils.Utility;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import java.text.ParseException;
import java.util.Date;

@Entity
public class WorkingHours {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="working_hours_id")
    private String id;

    @ManyToOne(fetch=FetchType.LAZY, optional = false)
    @JoinColumn(name="admin_id", referencedColumnName="user_id")
    private AdminDetails admin_id;

    // 1 for Sunday, 2-6 for Monday-Friday
    @NotNull(message = "Day is required (1 for Sunday, 2-6 for Monday-Friday)")
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

    public WorkingHours() {

    }

    public WorkingHours(AdminDetails adminId, int day, String startTime, String endTime, String date)
            throws ParseException {
        this.admin_id = adminId;
        this.day = day;
        setDate(date);
        setStartTime(startTime);
        setEndTime(endTime);
    }

    public String getId() { return id; }

    public int getDay() { return day; }

    public Date getDate() { return date; }

    public Date getStartTime() { return startTime; }

    public Date getEndTime() { return endTime; }

    public void setDate(String date) throws ParseException {
        this.date = Utility.convertStringToDate(date);
    }

    public void setStartTime(String startTime) throws ParseException {
        this.startTime = Utility.convertStringToTime(startTime);
    }

    public void setEndTime(String endTime) throws ParseException {
        this.endTime = Utility.convertStringToTime(endTime);
    }

    public void setDateByDate(Date reset) {
        this.date = reset;
    }
}
