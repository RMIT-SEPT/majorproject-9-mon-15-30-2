package com.rmit.sept.monday15302.services;

import com.rmit.sept.monday15302.Repositories.BookingRepository;
import com.rmit.sept.monday15302.model.Booking;
import com.rmit.sept.monday15302.model.BookingStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingRepository bookingRepository;

    public Iterable<Booking> getAllPastBookings(String customerId) {
        return bookingRepository.findPastBookingByCustomerID(customerId);
    }

    public List<Booking> getAllNewBookings(String customerId) throws ParseException {
        Iterable<Booking> bookings = bookingRepository.findNewBookingByCustomerID(customerId);
        return sortBookings(bookings);
    }

    @Transactional
    public List<Booking> sortBookings(Iterable<Booking> bookings) throws ParseException {
        List<Booking> bookingList = new ArrayList<>();
        Date currentDate = new Date();

        SimpleDateFormat dateFormatter = new SimpleDateFormat("yyyy-MM-dd");
        SimpleDateFormat timeFormatter = new SimpleDateFormat("HH:mm:ss");

        String dateAsString = dateFormatter.format(currentDate);
        String timeAsString = timeFormatter.format(currentDate);

        Date actualDate = dateFormatter.parse(dateAsString);
        Date actualTime = timeFormatter.parse(timeAsString);

        for (Booking booking : bookings) {
            int toCompare = actualDate.compareTo(booking.getDate());
            if (toCompare == 0) {
                Date d2 = timeFormatter.parse(booking.getEndTime().toString());
                long elapsed = actualTime.getTime() - d2.getTime();
                if (elapsed > 0) {
                    bookingRepository.updateBookingStatus(booking.getId(),
                            BookingStatus.PAST_BOOKING);
                } else {
                    bookingList.add(booking);
                }
            } else if (toCompare > 0) {
                bookingRepository.updateBookingStatus(booking.getId(),
                        BookingStatus.PAST_BOOKING);
            } else {
                bookingList.add(booking);
            }
        }
        return bookingList;
    }
}
