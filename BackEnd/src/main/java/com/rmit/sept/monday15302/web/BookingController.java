package com.rmit.sept.monday15302.web;

import com.rmit.sept.monday15302.model.Booking;
import com.rmit.sept.monday15302.model.WorkerDetails;
import com.rmit.sept.monday15302.services.BookingService;
import com.rmit.sept.monday15302.services.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;
import java.util.Date;
import java.util.List;

@RestController
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @GetMapping(value="historybookings/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getPastBookings(@PathVariable("id") String id) {
        List<Booking> bookings = bookingService.getAllPastBookings(id);
        return new ResponseEntity<List<Booking>>(bookings, HttpStatus.OK);
    }

    @GetMapping(value="newbookings/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getNewBookings(@PathVariable("id") String id) throws ParseException {
        List<Booking> bookings = bookingService.getAllNewBookings(id);
        return new ResponseEntity<List<Booking>>(bookings, HttpStatus.OK);
    }

    @GetMapping("makebooking/byservice/{service}")
    public ResponseEntity<?> getWorkerByService(@PathVariable("service") String service) {
        List<WorkerDetails> workersList = bookingService.getWorkerByService(service);
        return new ResponseEntity<List<WorkerDetails>>(workersList, HttpStatus.OK);
    }

    @GetMapping("makebooking/byworker/{workerId}")
    public ResponseEntity<?> getServiceByWorker(@PathVariable("workerId") String workerId) {
        String service = bookingService.getServiceByWorker(workerId);
        return new ResponseEntity<String>(service, HttpStatus.OK);
    }

    @PostMapping("makebooking/create")
    public ResponseEntity<?> createNewBooking(@Valid @RequestBody Booking booking, BindingResult result) {

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Booking newBooking = bookingService.saveOrUpdateBooking(booking);
        return new ResponseEntity<Booking>(newBooking, HttpStatus.CREATED);
    }

    @GetMapping("makebooking/allservices")
    public ResponseEntity<?> getAllServices() {
        return new ResponseEntity<List<String>>(bookingService.getAllServices(), HttpStatus.OK);
    }

    @GetMapping("makebooking/allworkers")
    public ResponseEntity<?> getAllWorkers() {
        return new ResponseEntity<Iterable<WorkerDetails>>(bookingService.getAllWorkers(),
                HttpStatus.OK);
    }

    @GetMapping("makebooking/openinghours/{workerId}/{date}")
    public ResponseEntity<?> getOpeningHours(@PathVariable("workerId") String workerId,
                                            @PathVariable("date") String date) throws ParseException {
        return new ResponseEntity<List<Date>>(bookingService.getOpeningHours(workerId, date),
                HttpStatus.OK);
    }

    @GetMapping("makebooking/unavailablesessions/{workerId}/{date}")
    public ResponseEntity<?> getUnavailableSessions(@PathVariable("workerId") String workerId,
                                            @PathVariable("date") String date) throws ParseException {
        return new ResponseEntity<List<Booking>>(bookingService.getUnavailableSessions(workerId, date),
                HttpStatus.OK);
    }

}

