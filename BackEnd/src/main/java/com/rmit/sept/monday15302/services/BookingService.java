package com.rmit.sept.monday15302.services;

import com.rmit.sept.monday15302.Repositories.BookingRepository;
import com.rmit.sept.monday15302.exception.BookingException;
import com.rmit.sept.monday15302.model.Booking;
import com.rmit.sept.monday15302.model.BookingStatus;
import com.rmit.sept.monday15302.utils.Utility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    public List<Booking> getAllPastBookingsByCustomerId(String customerId) {
        List<Booking> toReturn = bookingRepository.findPastBookingByCustomerID(customerId);
        if(toReturn.size() == 0) {
            throw new BookingException("No past bookings found for customer with id " + customerId);
        }
        return toReturn;
    }

    public List<Booking> getAllNewBookingsByCustomerId(String customerId) throws ParseException {
        List<Booking> toReturn = sortBookings(bookingRepository.
                findNewBookingByCustomerID(customerId));
        if(toReturn.size() == 0) {
            throw new BookingException("No new bookings found for customer with id " + customerId);
        }
        return toReturn;
    }

    @Transactional
    public List<Booking> sortBookings(List<Booking> bookings) throws ParseException {
        List<Booking> bookingList = new ArrayList<>();
        Date currentDate = new Date();

        String dateAsString = Utility.getDateAsString(currentDate);
        String timeAsString = Utility.getTimeAsString(currentDate);

        Date actualDate = Utility.convertStringToDate(dateAsString);
        Date actualTime = Utility.convertStringToTime(timeAsString);

        for (Booking booking : bookings) {
            int toCompare = actualDate.compareTo(booking.getDate());
            if (toCompare == 0) {
                Date d2 = Utility.convertStringToTime(booking.getEndTime().toString());
                long elapsed = actualTime.getTime() - d2.getTime();
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

    public Booking saveOrUpdateBooking(Booking booking) {
        try {
            return bookingRepository.save(booking);
        } catch (Exception e) {
            throw new BookingException("Cannot create a booking");
        }
    }

    public List<Booking> getUnavailableSessions(String workerId, String date) throws ParseException {
        List<Booking> unavailable = bookingRepository.
                findNewBookingByWorkerAndDate(workerId, Utility.convertStringToDate(date));
        return sortBookings(unavailable);
    }
}
