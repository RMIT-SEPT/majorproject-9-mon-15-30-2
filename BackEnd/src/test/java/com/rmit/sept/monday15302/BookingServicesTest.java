package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.services.BookingService;
import com.rmit.sept.monday15302.model.*;

import java.util.Date;

import com.rmit.sept.monday15302.Repositories.BookingRepository;

import org.junit.BeforeClass;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class BookingServicesTest 
{
    @Autowired
    private BookingService bookingService;

    @Autowired
    private BookingRepository bookingRepository;

    CustomerDetails c1;
    CustomerDetails c2;
    AdminDetails a1;
    WorkerDetails w1;
    Booking b1;
    Booking b2;

    @BeforeEach
    public void createData()
    {
        c1 = new CustomerDetails("c1", "fname", "lname", "address", "phoneNumber", "email");
        c2 = new CustomerDetails("c2", "f", "l", "ad", "12345678", "mail");
        a1 = new AdminDetails("a1", "name", "service");
        w1 = new WorkerDetails("w1", "fn", "lN", a1);
        b1 = new Booking("b1", c1, w1, BookingStatus.NEW_BOOKING,  "Massage");
        b2 = new Booking("b2", c1, w1, BookingStatus.NEW_BOOKING,  "Haircut");
    }
}