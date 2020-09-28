package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.Repositories.BookingRepository;
import com.rmit.sept.monday15302.exception.BookingException;
import com.rmit.sept.monday15302.model.Booking;
import com.rmit.sept.monday15302.model.BookingStatus;
import com.rmit.sept.monday15302.model.CustomerDetails;
import com.rmit.sept.monday15302.model.WorkerDetails;
import com.rmit.sept.monday15302.services.BookingService;
import com.rmit.sept.monday15302.utils.Utility;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.text.ParseException;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BookingServiceTest {

    private static final BookingStatus status = BookingStatus.NEW_BOOKING;
    private static final String date = "2020-15-04";
    private static final String startTime = "15:00:00";
    private static final String endTime = "16:00:00";
    private static final String service = "Massage";
    private static CustomerDetails customer;
    private static WorkerDetails worker;
    private static final String workerId = "w1";
    private static Date today = new Date();

    @Autowired
    private BookingService bookingService;

    @MockBean
    private BookingRepository bookingRepository;

    @Before
    public void setup() throws ParseException {
        String customerId = "123";
        customer = new CustomerDetails();
        customer.setId(customerId);

        Booking booking1 = new Booking();
        booking1.setCustomer(customer);
        booking1.setStatus(BookingStatus.PAST_BOOKING);

        Booking booking3 = new Booking();
        booking3.setCustomer(customer);
        booking3.setStatus(BookingStatus.CANCELLED_BOOKING);

        List<Booking> pastBookingList = Arrays.asList(booking1, booking3);

        Mockito.when(bookingRepository.findPastBookingByCustomerID(customerId))
                .thenReturn(pastBookingList);

        Booking booking2 = new Booking();
        booking2.setCustomer(customer);
        booking2.setStatus(status);
        booking2.setDate("2030-10-15");

        List<Booking> newBookingList = Arrays.asList(booking2);

        Mockito.when(bookingRepository.findNewBookingByCustomerID(customerId))
                .thenReturn(newBookingList);

        worker = new WorkerDetails();
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
    public void findPastBookingsByCustomerId_returnBookings_ifPastBookingsFound() {
        String customerId = "123";
        assert(bookingService.getAllPastBookingsByCustomerId(customerId).size() == 2);
    }

    @Test(expected = BookingException.class)
    public void findNewBookingsByCustomerId_throwException_ifNoNewBookingsFound()
            throws BookingException, ParseException {
        bookingService.getAllNewBookingsByCustomerId("789");
    }

    @Test
    public void findNewBookingByCustomerID_returnBooking_ifOneBookingIsFound() throws ParseException {
        String customerId = "123";
        assert(bookingService.getAllNewBookingsByCustomerId(customerId).size() == 1);
    }

    @Test
    public void testGetUnavailableSessions() throws ParseException {
        String workerId = "w1";
        String date = "2030-10-15";
        assert(bookingService.getUnavailableSessions(workerId, date).size() == 1);
    }

    @Test
    public void caseSameDay_throwException_ifStatusNotUpdated()
            throws ParseException {
        // When
        Booking booking = new Booking(customer, worker,
                status, Utility.getDateAsString(today),
                "05:00:00", "06:00:00", service);
        booking.setId("b1");
        List<Booking> bookings = Arrays.asList(booking);
        Mockito.doThrow(new BookingException("Cannot update booking " +
                "status for booking with id b1")).when(bookingRepository)
                .updateBookingStatus("b1", BookingStatus.PAST_BOOKING);
        bookingService.sortBookings(bookings);
    }

    @Test
    public void casePastDay_throwException_ifStatusNotUpdated()
            throws ParseException {
        Date date = new Date(today.getTime() - (1000 * 60 * 60 * 24));
        Booking booking = new Booking(customer, worker,
                status, Utility.getDateAsString(date),
                "08:00:00", "09:00:00", service);
        booking.setId("b1");
        List<Booking> bookings = Arrays.asList(booking);
        Mockito.doThrow(new BookingException("Cannot update booking " +
                "status for booking with id b1")).when(bookingRepository)
                .updateBookingStatus("b1", BookingStatus.PAST_BOOKING);
        bookingService.sortBookings(bookings);
    }

    @Test
    public void sortBooking_BookingDateInThePast_updateBookingStatus()
            throws ParseException {
        Date date = new Date(today.getTime() - (1000 * 60 * 60 * 24));
        Booking booking = new Booking(customer, worker,
                status, Utility.getDateAsString(date),
                "08:00:00", "09:00:00", service);
        booking.setId("b1");
        List<Booking> bookings = Arrays.asList(booking);
        List<Booking> sortedBookings = bookingService.sortBookings(bookings);
        assert(sortedBookings.isEmpty());
    }

    @Test
    public void sortBooking_CurrentDateButBookingTimeInThePast_updateBookingStatus()
            throws ParseException {
        Booking booking = new Booking(customer, worker,
                status, Utility.getDateAsString(today),
                "01:00:00", "02:00:00", service);
        booking.setId("b1");
        List<Booking> bookings = Arrays.asList(booking);
        List<Booking> sortedBookings = bookingService.sortBookings(bookings);
        assert(sortedBookings.isEmpty());
    }

    @Test
    public void sortBooking_CurrentDate_statusNotUpdated()
            throws ParseException {
        Booking booking = new Booking(customer, worker,
                status, Utility.getDateAsString(today),
                "23:00:00", "23:59:00", service);
        booking.setId("b1");
        List<Booking> bookings = Arrays.asList(booking);
        List<Booking> sortedBookings = bookingService.sortBookings(bookings);
        assert(!sortedBookings.isEmpty());
    }

    @Test
    public void sortBooking_NewBooking_statusNotUpdated()
            throws ParseException {
        Date date = new Date(today.getTime() + (1000 * 60 * 60 * 24));
        Booking booking = new Booking(customer, worker,
                status, Utility.getDateAsString(date),
                "05:00:00", "06:00:00", service);
        booking.setId("b1");
        List<Booking> bookings = Arrays.asList(booking);
        List<Booking> sortedBookings = bookingService.sortBookings(bookings);
        assert(!sortedBookings.isEmpty());
    }

    @Test
    public void createNewBooking_returnBooking_ifBookingAdded() throws ParseException {
        CustomerDetails customer = new CustomerDetails();
        WorkerDetails worker = new WorkerDetails();
        Booking booking = new Booking("b1", customer, worker, status, date, startTime,
                endTime, service);
        bookingService.saveOrUpdateBooking(booking);
        Mockito.verify(bookingRepository,
                Mockito.times(1)).save(booking);
    }

    @Test(expected = BookingException.class)
    public void createNewBooking_throwException_ifBookingNotAdded()
            throws ParseException, BookingException {
        Booking booking = new Booking("b1", customer, worker, status, date,
                startTime, endTime, service);
        Mockito.doThrow(new BookingException("Cannot create a booking"))
                .when(bookingRepository)
                .save(booking);
        bookingService.saveOrUpdateBooking(booking);
    }
}
