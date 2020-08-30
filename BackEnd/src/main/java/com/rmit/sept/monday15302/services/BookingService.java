package com.rmit.sept.monday15302.services;

import com.rmit.sept.monday15302.Repositories.AdminDetailsRepository;
import com.rmit.sept.monday15302.Repositories.BookingRepository;
import com.rmit.sept.monday15302.Repositories.WorkerDetailsRepository;
import com.rmit.sept.monday15302.exception.BookingException;
import com.rmit.sept.monday15302.model.Booking;
import com.rmit.sept.monday15302.model.BookingStatus;
import com.rmit.sept.monday15302.model.WorkerDetails;
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

    @Autowired
    private AdminDetailsRepository adminDetailsRepository;

    @Autowired
    private WorkerDetailsRepository workerDetailsRepository;

    public List<Booking> getAllPastBookings(String customerId) {
        List<Booking> toReturn = bookingRepository.findPastBookingByCustomerID(customerId);
        if(toReturn.size() == 0) {
            throw new BookingException("No past bookings found for customer " + customerId);
        }
        return toReturn;
    }

    public List<Booking> getAllNewBookings(String customerId) throws ParseException {
        Iterable<Booking> bookings = bookingRepository.findNewBookingByCustomerID(customerId);
        List<Booking> toReturn = sortBookings(bookings);
        if(toReturn.size() == 0) {
            throw new BookingException("No new bookings found for customer " + customerId);
        }
        return toReturn;
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
                    try {
                        bookingRepository.updateBookingStatus(booking.getId(),
                                BookingStatus.PAST_BOOKING);
                    } catch (Exception e) {
                        throw new BookingException("Cannot update booking status");
                    }
                } else {
                    bookingList.add(booking);
                }
            } else if (toCompare > 0) {
                try {
                    bookingRepository.updateBookingStatus(booking.getId(),
                            BookingStatus.PAST_BOOKING);
                } catch (Exception e) {
                    throw new BookingException("Cannot update booking status");
                }
            } else {
                bookingList.add(booking);
            }
        }
        return bookingList;
    }

    public List<WorkerDetails> getWorkerByService(String service) {
        List<WorkerDetails> workersList = new ArrayList<>();
        Iterable<String> adminList = adminDetailsRepository.getAdminIdFromService(service);
        for (String adminId : adminList) {
            workersList.addAll(workerDetailsRepository.findByAdminId(adminId));
        }

        if(workersList.size() == 0) {
            throw new BookingException("Cannot find workers for service " + service);
        }

        return workersList;
    }

    public String getServiceFromWorker(String workerId) {
        String service;
        String adminId = workerDetailsRepository.getAdminIdFromWorkerId(workerId);
        if(adminId != null) {
            service = adminDetailsRepository.getServiceByAdminId(adminId);
        } else {
            throw new BookingException("Cannot find admin for worker " + workerId);
        }

        if(service == null) {
            throw new BookingException("Cannot find service for worker " + workerId);
        }

        return service;
    }

    public Booking saveOrUpdateBooking(Booking booking) {
        try {
            return bookingRepository.save(booking);
        } catch (Exception e) {
            throw new BookingException("Cannot create a booking");
        }
    }
}
