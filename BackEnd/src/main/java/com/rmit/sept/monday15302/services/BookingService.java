package com.rmit.sept.monday15302.services;

import com.rmit.sept.monday15302.Repositories.BookingRepository;
import com.rmit.sept.monday15302.exception.BookingException;
import com.rmit.sept.monday15302.model.Booking;
import com.rmit.sept.monday15302.model.BookingStatus;
import com.rmit.sept.monday15302.model.Confirmation;
import com.rmit.sept.monday15302.utils.Request.BookingConfirmation;
import com.rmit.sept.monday15302.utils.Request.EditWorker;
import com.rmit.sept.monday15302.utils.Utility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.util.*;

@Service
public class BookingService {

    @Autowired
    private WorkerDetailsService workerDetailsService;

    @Autowired
    private BookingRepository bookingRepository;

    public List<Booking> getPastBookingsByCustomerId(String customerId) {
        List<Booking> toReturn = bookingRepository.findPastBookingByCustomerID(customerId);
        if(toReturn.size() == 0) {
            throw new BookingException("No past bookings found for customer with id " + customerId);
        }
        return toReturn;
    }

    public List<Booking> getNewBookingsByCustomerId(String customerId) throws ParseException {
        List<Booking> toReturn = updateBookingStatus(bookingRepository.
                findNewBookingByCustomerID(customerId));
        if(toReturn.size() == 0) {
            throw new BookingException("No new bookings found for customer with id " + customerId);
        }
        return toReturn;
    }

    public List<Booking> getPastBookingsByAdminID(String adminID) {

        List<Booking> bookings = new ArrayList<>();

        List<EditWorker> workers = workerDetailsService.getWorkersByAdminId(adminID);
        for (EditWorker worker : workers) {
            bookings.addAll(bookingRepository.findPastBookingByWorkerID(worker.getId()));
        }
        if(bookings.isEmpty()) {
            throw new BookingException("No past bookings found for admin ID: " + adminID);
        }
        return bookings;
    }

    public List<Booking> getNewBookingsByAdminID(String adminID) throws ParseException {

        List<Booking> bookings = new ArrayList<>();

        List<EditWorker> workers = workerDetailsService.getWorkersByAdminId(adminID);
        for (EditWorker worker : workers) {
            bookings.addAll(bookingRepository.findNewBookingByWorkerID(worker.getId()));
        }
        List<Booking> toReturn = updateBookingStatus(bookings);

        if(toReturn.isEmpty()) {
            throw new BookingException("No new bookings found for admin ID: " + adminID);
        }

        return toReturn;
    }

    @Transactional
    public List<Booking> updateBookingStatus(List<Booking> bookings) throws ParseException {
        List<Booking> bookingList = new ArrayList<>();
        Date currentDate = new Date();

        String dateAsString = Utility.getDateAsString(currentDate);
        String timeAsString = Utility.getTimeAsString(currentDate);

        Date actualDate = Utility.convertStringToDate(dateAsString);
        Date actualTime = Utility.convertStringToTime(timeAsString);

        for (Booking booking : bookings) {
            int toCompare = actualDate.compareTo(booking.getDate());
            if (toCompare == 0) {
                long elapsed = actualTime.getTime() - booking.getEndTime().getTime();
                if (elapsed > 0) {
                    try {
                        bookingRepository.updateBookingStatus(booking.getId(),
                                BookingStatus.PAST_BOOKING);
                    } catch (BookingException e) {
                        System.out.println("Cannot update booking status " +
                                "for booking with id " + booking.getId());
                    }
                } else {
                    bookingList.add(booking);
                }
            } else if (toCompare > 0) {
                try {
                    bookingRepository.updateBookingStatus(booking.getId(),
                            BookingStatus.PAST_BOOKING);
                } catch (BookingException e) {
                    System.out.println("Cannot update booking status " +
                            "for booking with id " + booking.getId());
                }
            } else {
                bookingList.add(booking);
            }
        }
        return bookingList;
    }

    public Booking saveBooking(Booking booking) {
        if(!booking.getConfirmation().equals(Confirmation.PENDING)) {
            throw new BookingException("New booking must have 'Pending' " +
                    "status for confirmation");
        } else if(!booking.getStatus().equals(BookingStatus.NEW_BOOKING)) {
            throw new BookingException("New booking must have 'New Booking' status");
        }
        try {
            return bookingRepository.save(booking);
        } catch (BookingException e) {
            throw new BookingException("Cannot create a booking");
        }
    }

    public List<Booking> getUnavailableSessions(String workerId, String date) throws ParseException {
        List<Booking> unavailable = bookingRepository.
                findNewBookingByWorkerAndDate(workerId, Utility.convertStringToDate(date));
        return updateBookingStatus(unavailable);
    }

    public Booking getBookingById(String id) {
        Booking booking = bookingRepository.getBookingById(id);
        if(booking == null) {
            throw new BookingException("Booking not found");
        }
        return booking;
    }

    public Booking updateBooking(BookingConfirmation booking, String id) {
        BookingStatus status = booking.getStatus();
        Confirmation confirm = booking.getConfirmation();
        if(confirm.equals(Confirmation.CANCELLED) && !status.equals(BookingStatus.CANCELLED_BOOKING)) {
            throw new BookingException("There is a conflict between booking status and confirmation");
        }
        Booking updatedBooking = getBookingById(id);
        updatedBooking.setStatus(status);
        updatedBooking.setConfirmation(confirm);
        return bookingRepository.save(updatedBooking);
    }

    public Booking cancelBooking(String id) throws ParseException {
        Booking booking = getBookingById(id);
        if(!booking.getConfirmation().equals(Confirmation.CONFIRMED)) {
            throw new BookingException("Booking is rejected or pending " +
                    "cannot be cancelled by customer");
        }
        if(!isWithin2Days(booking)) {
            booking.setStatus(BookingStatus.CANCELLED_BOOKING);
            try {
                return bookingRepository.save(booking);
            } catch (BookingException e) {
                throw new BookingException("Cannot cancel booking");
            }
        } else {
            throw new BookingException("Cannot cancel a booking. It is within 48 hours");
        }
    }

    public boolean isWithin2Days(Booking booking) throws ParseException {
        boolean within = true;
        Date currentDate = new Date();
        Date bookingDate = booking.getDate();

        Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("Australia/Sydney"));
        cal.setTime(currentDate);
        int currentDay = cal.get(Calendar.DAY_OF_MONTH);
        int currentMonth = cal.get(Calendar.MONTH);

        cal.setTime(bookingDate);
        int bookingDay = cal.get(Calendar.DAY_OF_MONTH);
        int bookingMonth = cal.get(Calendar.MONTH);

        int days = bookingDay - currentDay;
        int months = bookingMonth - currentMonth;
        if(months > 0) {
            within = false;
        } else if(months == 0) {
            if(days > 2) {
                within = false;
            } else if(days == 2) {
                String timeAsString = Utility.getTimeAsString(currentDate);
                Date currentTime = Utility.convertStringToTime(timeAsString);
                Date bookingTime = booking.getStartTime();
                if (currentTime.getTime() <= bookingTime.getTime()) {
                    within = false;
                }
            }
        }
        return within;
    }
}
