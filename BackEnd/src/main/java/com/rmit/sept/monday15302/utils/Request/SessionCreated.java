package com.rmit.sept.monday15302.utils.Request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.rmit.sept.monday15302.utils.Utility;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.text.ParseException;
import java.util.Date;

public class SessionCreated {
    @NotNull(message = "Day is required (1 for Sunday, 2-6 for Monday-Friday)")
    @Min(1)
    @Max(7)
    private int day;

    @JsonFormat(pattern="HH:mm:ss")
    @Temporal(TemporalType.TIME)
    private Date startTime;

    @JsonFormat(pattern="HH:mm:ss")
    @Temporal(TemporalType.TIME)
    private Date endTime;

    @NotBlank(message = "Worker ID is required")
    private String workerId;

    private String workerFirstName;

    private String workerLastName;

    private String sessionId;

    public SessionCreated(int day, String startTime, String endTime, String workerId)
            throws ParseException {
        this.day = day;
        setStartTime(startTime);
        setEndTime(endTime);
        this.workerId = workerId;
    }

    public SessionCreated(int day, Date startTime, Date endTime, String workerFirstName,
                  String workerLastName, String sessionId) {
        this.day = day;
        this.startTime = startTime;
        this.endTime = endTime;
        this.workerFirstName = workerFirstName;
        this.workerLastName = workerLastName;
        this.sessionId = sessionId;
    }

    public SessionCreated() {

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

    public String getWorkerId() {
        return this.workerId;
    }

    public String getStartTime() {
        return Utility.getTimeAsString(startTime);
    }

    public String getEndTime() {
        return Utility.getTimeAsString(endTime);
    }

    public String getWorkerFirstName() {
        return workerFirstName;
    }

    public String getWorkerLastName() {
        return workerLastName;
    }

    public String getSessionId() {
        return sessionId;
    }
}
