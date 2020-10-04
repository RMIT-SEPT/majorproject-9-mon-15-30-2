package com.rmit.sept.monday15302.web;

import com.rmit.sept.monday15302.model.Booking;
import com.rmit.sept.monday15302.model.WorkerDetails;
import com.rmit.sept.monday15302.services.*;
import com.rmit.sept.monday15302.utils.Request.BookingConfirmation;
import com.rmit.sept.monday15302.utils.Response.SessionReturn;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class BookingController {
    @Autowired
    private SessionService sessionService;

    @Autowired
    private BookingService bookingService;

    @Autowired
    private WorkerDetailsService workerDetailsService;

    @Autowired
    private AdminDetailsService adminDetailsService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;
    
    @GetMapping(value="/customer/historybookings/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getPastBookings(@PathVariable("id") String id) {
        List<Booking> bookings = bookingService.getPastBookingsByCustomerId(id);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    @GetMapping(value="/customer/newbookings/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getNewBookings(@PathVariable("id") String id) throws ParseException {
        List<Booking> bookings = bookingService.getNewBookingsByCustomerId(id);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    @GetMapping("/customer/makebooking/workers/{service}")
    public ResponseEntity<?> getWorkersByService(@PathVariable("service") String service) {
        List<String> adminList = adminDetailsService.getAdminIdByService(service);
        List<WorkerDetails> workersList = workerDetailsService.getWorkersByAdminIds(adminList);
        return new ResponseEntity<>(workersList, HttpStatus.OK);
    }

    @PostMapping("/customer/createbooking")
    public ResponseEntity<?> createNewBooking(@Valid @RequestBody Booking booking, BindingResult result) {

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Booking newBooking = bookingService.saveBooking(booking);
        return new ResponseEntity<>(newBooking, HttpStatus.CREATED);
    }

    @GetMapping("/customer/makebooking/sessions/{workerId}/{service}")
    public ResponseEntity<?> getAvailableSessions(@PathVariable("workerId") String workerId,
                              @PathVariable("service") String service) throws ParseException {
        List<SessionReturn> toReturn = sessionService.getAvailableSession(workerId, service);
        return new ResponseEntity<>(toReturn, HttpStatus.OK);
    }

    @PutMapping("/admin/confirmBooking/{bookingId}")
    public ResponseEntity<?> updateWorker(@PathVariable("bookingId") String id,
                                          @Valid @RequestBody BookingConfirmation booking,
                                          BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Booking updatedBooking = bookingService.updateBooking(booking, id);
        return new ResponseEntity<>(updatedBooking, HttpStatus.OK);
    }

    @GetMapping(value="/admin/booking/{bookingId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getBookingById(@PathVariable("bookingId") String id) {
        return new ResponseEntity<>(bookingService.getBookingById(id), HttpStatus.OK);
    }

    @GetMapping(value="/admin/pastBookingsAdmin/{adminID}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getPastBookingsByAdminID(@PathVariable("adminID") String adminID) {
        List<Booking> bookings = bookingService.getPastBookingsByAdminID(adminID);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    @GetMapping(value="/admin/newBookingsAdmin/{adminID}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getNewBookingsByAdminID(@PathVariable("adminID") String adminID) throws ParseException {
        List<Booking> bookings = bookingService.getNewBookingsByAdminID(adminID);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

}
