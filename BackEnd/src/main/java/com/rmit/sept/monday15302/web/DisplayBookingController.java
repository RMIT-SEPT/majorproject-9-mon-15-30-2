package com.rmit.sept.monday15302.web;

import com.rmit.sept.monday15302.model.Booking;
import com.rmit.sept.monday15302.services.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.util.List;

@RestController
public class DisplayBookingController {
    @Autowired
    private BookingService bookingService;

    @GetMapping(value="historybookings/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getPastBookings(@PathVariable("id") String id) {
        Iterable<Booking> bookings = bookingService.getAllPastBookings(id);
        return new ResponseEntity<Iterable<Booking>>(bookings, HttpStatus.OK);
    }

    @GetMapping(value="newbookings/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getNewBookings(@PathVariable("id") String id) throws ParseException {
        List<Booking> bookings = bookingService.getAllNewBookings(id);
        return new ResponseEntity<List<Booking>>(bookings, HttpStatus.OK);
    }
}

