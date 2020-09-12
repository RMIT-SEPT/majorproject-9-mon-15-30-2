package com.rmit.sept.monday15302.web;

import com.rmit.sept.monday15302.model.Booking;
import com.rmit.sept.monday15302.model.WorkerDetails;
import com.rmit.sept.monday15302.services.*;
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

    @Autowired
    private WorkingHoursService workingHoursService;

    @GetMapping(value="historybookings/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getPastBookings(@PathVariable("id") String id) {
        List<Booking> bookings = bookingService.getAllPastBookingsByCustomerId(id);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    @GetMapping(value="newbookings/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getNewBookings(@PathVariable("id") String id) throws ParseException {
        List<Booking> bookings = bookingService.getAllNewBookingsByCustomerId(id);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    @GetMapping("makebooking/byservice/{service}")
    public ResponseEntity<?> getWorkerByService(@PathVariable("service") String service) {
        List<String> adminList = adminDetailsService.getAdminIdByService(service);
        List<WorkerDetails> workersList = workerDetailsService.getWorkerForAdmin(adminList);
        return new ResponseEntity<>(workersList, HttpStatus.OK);
    }

    @PostMapping("makebooking/create")
    public ResponseEntity<?> createNewBooking(@Valid @RequestBody Booking booking, BindingResult result) {

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Booking newBooking = bookingService.saveOrUpdateBooking(booking);
        return new ResponseEntity<>(newBooking, HttpStatus.CREATED);
    }

    @GetMapping("/makebooking/sessions/{workerId}/{service}")
    public ResponseEntity<?> getAvailableSessions(@PathVariable("workerId") String workerId,
                              @PathVariable("service") String service) throws ParseException {
        List<SessionReturn> toReturn = sessionService.getAvailableSession(workerId, service);
        return new ResponseEntity<>(toReturn, HttpStatus.OK);
    }
}
