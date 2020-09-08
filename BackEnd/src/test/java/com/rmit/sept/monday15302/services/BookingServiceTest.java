package com.rmit.sept.monday15302.services;

import com.rmit.sept.monday15302.Repositories.BookingRepository;
import com.rmit.sept.monday15302.exception.BookingException;
import com.rmit.sept.monday15302.model.Booking;
import com.rmit.sept.monday15302.model.BookingStatus;
import com.rmit.sept.monday15302.model.CustomerDetails;
import com.rmit.sept.monday15302.model.WorkerDetails;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BookingServiceTest {

    private static final BookingStatus status = BookingStatus.NEW_BOOKING;
    private static final String date = "2020-15-04";
    private static final String startTime = "15:00:00";
    private static final String endTime = "16:00:00";
    private static final String service = "Massage";

    @Autowired
    private BookingService bookingService;

    @MockBean
    private BookingRepository bookingRepository;

    @Before
    public void setup() throws ParseException {
        String customerId = "123";
        CustomerDetails customer = new CustomerDetails();
        customer.setId(customerId);

        Booking booking1 = new Booking();
        booking1.setCustomer(customer);
        booking1.setStatus(BookingStatus.PAST_BOOKING);

        Booking booking3 = new Booking();
        booking3.setCustomer(customer);
        booking3.setStatus(BookingStatus.CANCELLED_BOOKING);

        List<Booking> pastBookingList = new ArrayList<>();
        pastBookingList.add(booking1);
        pastBookingList.add(booking3);

        Mockito.when(bookingRepository.findPastBookingByCustomerID(customerId))
                .thenReturn(pastBookingList);

        Booking booking2 = new Booking();
        booking2.setCustomer(customer);
        booking2.setStatus(BookingStatus.NEW_BOOKING);
        booking2.setDate("2030-10-15");

        List<Booking> newBookingList = new ArrayList<>();
        newBookingList.add(booking2);

        Mockito.when(bookingRepository.findNewBookingByCustomerID(customerId))
                .thenReturn(newBookingList);

        String workerId = "w1";
        WorkerDetails worker = new WorkerDetails();
        worker.setId(workerId);
        booking2.setWorker(worker);

        Mockito.when(bookingRepository.findNewBookingByWorkerAndDate(workerId,
                booking2.getDate())).thenReturn(newBookingList);
    }

    @Test(expected = BookingException.class)
    public void findPastBookingsByCustomerId_throwException_ifNoPastBookingsFound()
            throws BookingException {
        bookingService.getAllPastBookingsByCustomerId("789");
    }

    @Test
    public void findPastBookingsByCustomerId_returnTrue_ifPastBookingsFound() {
        String customerId = "123";
        assert(bookingService.getAllPastBookingsByCustomerId(customerId).size() == 2);
    }

    @Test(expected = BookingException.class)
    public void findNewBookingsByCustomerId_throwException_ifNoNewBookingsFound()
            throws BookingException, ParseException {
        bookingService.getAllNewBookingsByCustomerId("789");
    }

    @Test
    public void findNewBookingByCustomerID_returnTrue_ifOneBookingIsFound() throws ParseException {
        String customerId = "123";
        assert(bookingService.getAllNewBookingsByCustomerId(customerId).size() == 1);
    }

    @Test
    public void getUnavailableSessions_returnTrue_ifSessionFound() throws ParseException {
        String workerId = "w1";
        String date = "2030-10-15";
        assert(bookingService.getUnavailableSessions(workerId, date).size() == 1);
    }

    @Test(expected = BookingException.class)
    public void getUnavailableSessions_throwException_ifNoSessionFound()
            throws BookingException, ParseException {
        bookingService.getUnavailableSessions("w3", "2020-10-15");
    }

    @Test
    public void updateBookingStatus_returnTrue_ifStatusIsUpdatedFromNewToPast()
            throws ParseException {
        // When
        String id = "11";
        Booking booking = new Booking();
        booking.setId(id);
        booking.setDate("2020-09-02");
        booking.setStatus(BookingStatus.NEW_BOOKING);
        List<Booking> bookingList = new ArrayList<>();
        bookingList.add(booking);
        bookingService.sortBookings(bookingList);

        // Then
        Mockito.verify(bookingRepository,
                Mockito.times(1)).updateBookingStatus(id,
                BookingStatus.PAST_BOOKING);
    }

    @Test
    public void createNewBooking_returnTrue_ifBookingAdded() throws ParseException {
        CustomerDetails customer = new CustomerDetails();
        WorkerDetails worker = new WorkerDetails();
        Booking booking = new Booking("b1", customer, worker, status, date, startTime, endTime, service);
        bookingService.saveOrUpdateBooking(booking);
        Mockito.verify(bookingRepository,
                Mockito.times(1)).save(booking);
    }
}
