package com.rmit.sept.monday15302.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.rmit.sept.monday15302.utils.Utility;

import javax.persistence.*;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.text.ParseException;
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
    @JoinColumn(name="work_id", referencedColumnName="user_id", nullable = false)
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

    public Session(WorkerDetails worker, int day, String startTime, String endTime,
                   String service) throws ParseException {
        this.worker = worker;
        this.day = day;
        setStartTime(startTime);
        setEndTime(endTime);
        this.service = service;
    }

    public Session() {

    }

    public void setStartTime(String startTime) throws ParseException {
        this.startTime = Utility.convertStringToTime(startTime);
    }

    public void setEndTime(String endTime) throws ParseException {
        this.endTime = Utility.convertStringToTime(endTime);
    }

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

    @Override
    public boolean equals(Object o) {
        Session s = (Session) o;
        return session_id.equals(s.getId()) && worker.equals(s.getWorker())
                && day == s.getDay() && startTime.equals(s.getStartTime())
                && endTime.equals(s.getEndTime())
                && service.equals(s.getService());
    }

    private String getId() {
        return this.session_id;
    }

    @Override
    public int hashCode() {
        int result = session_id != null ? session_id.hashCode() : 0;
        result = 31 * result + (worker != null ? worker.hashCode() : 0);
        result = 31 * result + day;
        result = 31 * result + (startTime != null ? startTime.hashCode() : 0);
        result = 31 * result + (endTime != null ? endTime.hashCode() : 0);
        result = 31 * result + (service != null ? service.hashCode() : 0);

        return result;
    }

    public void setDay(int i) {
        this.day = i;
    }

    public void setService(String s) {
        this.service = s;
    }
}
