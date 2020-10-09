package com.rmit.sept.monday15302.utils.Response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.rmit.sept.monday15302.utils.Utility;

import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import java.text.ParseException;
import java.util.Date;

public class SessionReturn {

    private int id;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Temporal(TemporalType.DATE)
    private Date date;

    @JsonFormat(pattern = "HH:mm:ss")
    @Temporal(TemporalType.TIME)
    private Date startTime;

    @JsonFormat(pattern = "HH:mm:ss")
    @Temporal(TemporalType.TIME)
    private Date endTime;

    public SessionReturn(String date, String startTime, String endTime) throws ParseException {
        setDate(date);
        setStartTime(startTime);
        setEndTime(endTime);
    }

    public SessionReturn(Date time, Date startTime, Date endTime) {
        this.date = time;
        this.startTime = startTime;
        this.endTime = endTime;
    }

    public SessionReturn() {

    }

    public Date getDate() {
        return date;
    }

    public Date getStartTime() {
        return startTime;
    }

    public Date getEndTime() {
        return endTime;
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

    public void setId(int id) {
        this.id = id;
    }
}
