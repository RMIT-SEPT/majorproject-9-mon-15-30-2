package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.Repositories.BookingRepository;
import com.rmit.sept.monday15302.exception.BookingException;
import com.rmit.sept.monday15302.model.*;
import com.rmit.sept.monday15302.services.BookingService;
import com.rmit.sept.monday15302.services.WorkerDetailsService;
import com.rmit.sept.monday15302.utils.Request.BookingConfirmation;
import com.rmit.sept.monday15302.utils.Request.EditWorker;
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

import static org.mockito.Mockito.times;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BookingServiceTest {

    private static CustomerDetails customer = new CustomerDetails();
    private static WorkerDetails worker = new WorkerDetails();
    private static final String workerId = "w1";
    private static Date today = new Date();
    private static String validCustomerId = "123";
    private static String invalidCustomerId = "789";
    private static String bookedDate = "2030-10-15";
    private static String bookingId = "b1";
    private static Booking booking;
    private static List<Booking> bookings;
    private static BookingConfirmation confirm =
            new BookingConfirmation(BookingStatus.NEW_BOOKING, Confirmation.CONFIRMED);
    private static String adminId = "a1";

    @Autowired
    private BookingService bookingService;

    @MockBean
    private BookingRepository bookingRepository;

    @MockBean
    private WorkerDetailsService workerDetailsService;

    @Before
    public void setup() throws ParseException {
        customer.setId(validCustomerId);
        worker.setId(workerId);

        Booking booking1 = new Booking(bookingId, customer, worker,
                BookingStatus.PAST_BOOKING, bookedDate, "15:00:00",
                "16:00:00", "Massage", Confirmation.PENDING);

        Booking booking3 = new Booking(customer, worker,
                BookingStatus.CANCELLED_BOOKING, bookedDate, "15:00:00",
                "16:00:00", "Massage", Confirmation.PENDING);

        List<Booking> pastBookings = Arrays.asList(booking1, booking3);

        Mockito.when(bookingRepository.findPastBookingByCustomerID(validCustomerId))
                .thenReturn(pastBookings);

        Booking booking2 = new Booking(customer, worker,
                BookingStatus.NEW_BOOKING, bookedDate, "15:00:00",
                "16:00:00", "Massage", Confirmation.PENDING);

        List<Booking> newBookings = Arrays.asList(booking2);

        Mockito.when(bookingRepository.findNewBookingByCustomerID(validCustomerId))
                .thenReturn(newBookings);

        booking = new Booking(bookingId, customer, worker,
                BookingStatus.NEW_BOOKING, Utility.getDateAsString(today),
                "05:00:00", "06:00:00", "Massage", Confirmation.PENDING);

        bookings = Arrays.asList(booking);

        EditWorker worker = new EditWorker(workerId, "worker",
                "John", "Smith", "0123456789");
        List<EditWorker> workers = Arrays.asList(worker);

        Mockito.when(bookingRepository.findNewBookingByWorkerAndDate(workerId,
                booking2.getDate())).thenReturn(newBookings);

        Mockito.when(bookingRepository.getBookingById(bookingId)).thenReturn(booking);
        Mockito.when(workerDetailsService.getWorkersByAdminId(adminId)).thenReturn(workers);
    }

    @Test(expected = BookingException.class)
    public void getPastBookingsByCustomerId_throwException_ifNoPastBookingsFound()
            throws BookingException {
        bookingService.getPastBookingsByCustomerId(invalidCustomerId);
    }

    @Test
    public void getPastBookingsByCustomerId_returnBookings_ifPastBookingsFound() {
        assert(bookingService.getPastBookingsByCustomerId(validCustomerId).size() == 2);
    }

    @Test(expected = BookingException.class)
    public void getNewBookingsByCustomerId_throwException_ifNoNewBookingsFound()
            throws BookingException, ParseException {
        bookingService.getNewBookingsByCustomerId(invalidCustomerId);
    }

    @Test
    public void getNewBookingsByCustomerId_returnBooking_ifOneBookingIsFound() throws ParseException {
        assert(bookingService.getNewBookingsByCustomerId(validCustomerId).size() == 1);
    }

    @Test
    public void testGetUnavailableSessions() throws ParseException {
        assert(bookingService.getUnavailableSessions(workerId, bookedDate).size() == 1);
    }

    @Test
    public void updateBookingStatus_throwException_ifStatusNotUpdatedForSameDayCase()
            throws ParseException {
        Mockito.doThrow(new BookingException("Cannot update booking " +
                "status for booking with id " + bookingId)).when(bookingRepository)
                .updateBookingStatus(bookingId, BookingStatus.PAST_BOOKING);
        bookingService.updateBookingStatus(bookings);
    }

    @Test
    public void updateBookingStatus_throwException_ifStatusNotUpdatedForPastDayCase()
            throws ParseException {
        Date date = new Date(today.getTime() - (1000 * 60 * 60 * 24));
        booking.setDate(Utility.getDateAsString(date));
        Mockito.doThrow(new BookingException("Cannot update booking " +
                "status for booking with id " + bookingId)).when(bookingRepository)
                .updateBookingStatus(bookingId, BookingStatus.PAST_BOOKING);
        bookingService.updateBookingStatus(bookings);
    }

    @Test
    public void updateBookingStatus_updateStatus_ifBookingDateInThePast()
            throws ParseException {
        Date date = new Date(today.getTime() - (1000 * 60 * 60 * 24));
        booking.setDate(Utility.getDateAsString(date));
        List<Booking> sortedBookings = bookingService.updateBookingStatus(bookings);
        assert(sortedBookings.isEmpty());
    }

    @Test
    public void updateBookingStatus_updateStatus_ifCurrentDateButPastBookingTime()
            throws ParseException {
        booking.setEndTime("00:01:00");
        List<Booking> sortedBookings = bookingService.updateBookingStatus(bookings);
        assert(sortedBookings.isEmpty());
    }

    @Test
    public void updateBookingStatus_throwException_ifNotUpdatedWhenCurrentDateButPastBookingTime()
            throws ParseException {
        booking.setEndTime("00:01:00");
        Mockito.doThrow(new BookingException("")).when(bookingRepository)
                .updateBookingStatus(bookingId, BookingStatus.PAST_BOOKING);
        bookingService.updateBookingStatus(bookings);
    }

    @Test
    public void updateBookingStatus_statusNotUpdated_ifCurrentDate()
            throws ParseException {
        booking.setStartTime("23:00:00");
        booking.setEndTime("23:59:00");
        List<Booking> sortedBookings = bookingService.updateBookingStatus(bookings);
        assert(!sortedBookings.isEmpty());
    }

    @Test
    public void updateBookingStatus_statusNotUpdated_ifBookingDateInFuture()
            throws ParseException {
        Date date = new Date(today.getTime() + (1000 * 60 * 60 * 24));
        booking.setDate(Utility.getDateAsString(date));
        List<Booking> sortedBookings = bookingService.updateBookingStatus(bookings);
        assert(!sortedBookings.isEmpty());
    }

    @Test
    public void saveBooking_returnBooking_ifBookingAdded() {
        booking.setConfirmation(Confirmation.PENDING);
        bookingService.saveBooking(booking);
        Mockito.verify(bookingRepository,
                Mockito.times(1)).save(booking);
    }

    @Test(expected = BookingException.class)
    public void saveBooking_throwException_ifBookingNotAdded()
            throws BookingException {
        Mockito.doThrow(new BookingException("Cannot create a booking"))
                .when(bookingRepository)
                .save(booking);
        bookingService.saveBooking(booking);
    }
    
    @Test(expected = BookingException.class) 
    public void saveBooking_throwException_ifBookingStatusIsNotNew() {
        booking.setStatus(BookingStatus.PAST_BOOKING);
        bookingService.saveBooking(booking);
    }

    @Test(expected = BookingException.class)
    public void saveBooking_throwException_ifConfirmationNotPending() {
        booking.setConfirmation(Confirmation.CANCELLED);
        bookingService.saveBooking(booking);
    }

    @Test
    public void getBookingById_returnBooking_ifBookingFound() {
        assert(bookingService.getBookingById(bookingId) != null);
    }

    @Test(expected = BookingException.class)
    public void getBookingById_throwException_ifNoBookingFound() {
        bookingService.getBookingById("123");
    }

    @Test(expected = BookingException.class)
    public void updateBooking_throwException_ifConfirmationNotMatchStatus() {
        confirm.setConfirmation(Confirmation.CANCELLED);
        bookingService.updateBooking(confirm, bookingId);
    }

    @Test
    public void updateBooking_returnBooking_ifBookingUpdated() {
        confirm.setConfirmation(Confirmation.CONFIRMED);
        Mockito.when(bookingRepository.save(booking)).thenReturn(booking);
        bookingService.updateBooking(confirm, bookingId);
        Mockito.verify(bookingRepository, times(1)).save(booking);
    }

    @Test(expected = BookingException.class)
    public void cancelBooking_throwException_ifBookingIsPending()
            throws BookingException, ParseException {
        booking.setConfirmation(Confirmation.PENDING);
        bookingService.cancelBooking(bookingId);
    }

    @Test(expected = BookingException.class)
    public void cancelBooking_throwException_ifBookingIsCancelled()
            throws BookingException, ParseException {
        booking.setConfirmation(Confirmation.CANCELLED);
        bookingService.cancelBooking(bookingId);
    }

    @Test(expected = BookingException.class)
    public void cancelBooking_throwException_ifBookingTimeWithin2Days()
            throws BookingException, ParseException {
        booking.setConfirmation(Confirmation.CONFIRMED);
        Date date = new Date(today.getTime() - (1000 * 60 * 60 * 24));
        booking.setDate(Utility.getDateAsString(date));
        bookingService.cancelBooking(bookingId);
    }

    @Test
    public void cancelBooking_updateBookingStatus_ifCancellationIsValid() throws ParseException {
        booking.setConfirmation(Confirmation.CONFIRMED);
        Date date = new Date(today.getTime() + 4*(1000 * 60 * 60 * 24));
        booking.setDate(Utility.getDateAsString(date));
        booking.setStatus(BookingStatus.CANCELLED_BOOKING);
        Mockito.when(bookingRepository.save(Mockito.any(Booking.class))).thenReturn(booking);
        assert(bookingService.cancelBooking(bookingId).getStatus()
                .equals(BookingStatus.CANCELLED_BOOKING));
    }

    @Test(expected = BookingException.class)
    public void cancelBooking_throwException_ifCannotUpdateBookingStatus()
            throws BookingException, ParseException {
        booking.setConfirmation(Confirmation.CONFIRMED);
        Date date = new Date(today.getTime() + 4*(1000 * 60 * 60 * 24));
        booking.setDate(Utility.getDateAsString(date));
        Mockito.doThrow(new BookingException("")).when(bookingRepository).save(booking);
        bookingService.cancelBooking(bookingId);
    }

    @Test
    public void isWithin2Days_returnTrue_ifLessThan48Hours() throws ParseException {
        Date date = new Date(today.getTime() + 2*(1000 * 60 * 60 * 24));
        booking.setDate(Utility.getDateAsString(date));
        booking.setStartTime("00:01:00");
        assert(bookingService.isWithin2Days(booking));
    }

    @Test
    public void isWithin2Days_returnFalse_ifMoreThan48Hours() throws ParseException {
        Date date = new Date(today.getTime() + 2*(1000 * 60 * 60 * 24));
        booking.setDate(Utility.getDateAsString(date));
        booking.setStartTime("23:59:00");
        assert(!bookingService.isWithin2Days(booking));
    }

    @Test(expected = BookingException.class)
    public void getPastBookingsByAdminId_throwException_ifNoBookingsFound()
            throws BookingException {
        bookingService.getPastBookingsByAdminID(adminId);
    }

    @Test
    public void getPastBookingsByAdminId_returnBookings_ifBookingsFound() {
        Mockito.when(bookingRepository.findPastBookingByWorkerID(workerId)).thenReturn(bookings);
        List<Booking> returns = bookingService.getPastBookingsByAdminID(adminId);
        assert(!returns.isEmpty());
    }

    @Test(expected = BookingException.class)
    public void getNewBookingsByAdminId_throwException_ifNoBookingsFound()
            throws BookingException, ParseException {
        bookingService.getNewBookingsByAdminID(adminId);
    }

    @Test
    public void getNewBookingsByAdminId_returnBookings_ifBookingsFound() throws ParseException {
        Date date = new Date(today.getTime() + 4*(1000 * 60 * 60 * 24));
        booking.setDate(Utility.getDateAsString(date));
        Mockito.when(bookingRepository.findNewBookingByWorkerID(workerId)).thenReturn(bookings);
        List<Booking> returns = bookingService.getNewBookingsByAdminID(adminId);
        assert(!returns.isEmpty());
    }
}
