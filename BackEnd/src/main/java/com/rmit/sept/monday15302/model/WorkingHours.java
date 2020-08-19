package com.rmit.sept.monday15302.model;

import org.springframework.format.annotation.DateTimeFormat;

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
    private Long id;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name="admin_id", referencedColumnName="user_id")
    private AdminDetails admin_id;

    // 1 for Sunday and 7 for Saturday, 2-6 for Monday-Friday
    @NotBlank
    @Min(1)
    @Max(7)
    @Column(name = "day")
    private int day;

    @NotBlank
    @Temporal(TemporalType.DATE)
    @Column(name="notified_date")
    private Date date;

    @NotBlank
    @DateTimeFormat(pattern="hh:mm:ss")
    @Temporal(TemporalType.TIME)
    @Column(name="start_time")
    private Date startTime;

    @NotBlank
    @DateTimeFormat(pattern="hh:mm:ss")
    @Temporal(TemporalType.TIME)
    @Column(name="end_time")
    private Date endTime;
}
