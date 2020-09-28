package com.rmit.sept.monday15302.Repositories;

import com.rmit.sept.monday15302.model.Booking;
import com.rmit.sept.monday15302.model.BookingStatus;
import com.rmit.sept.monday15302.model.WorkerDetails;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Repository
public interface BookingRepository extends CrudRepository<Booking, String> {

    @Query("select DISTINCT booking from Booking booking where " +
            "booking.customer.user.id = :customerId and " +
            "booking.status <> com.rmit.sept.monday15302.model.BookingStatus.NEW_BOOKING " +
            "order by booking.date DESC")
    List<Booking> findPastBookingByCustomerID(@Param("customerId") String customerId);

    @Query("select DISTINCT booking from Booking booking where " +
            "booking.customer.user.id = :customerId and " +
            "booking.status = com.rmit.sept.monday15302.model.BookingStatus.NEW_BOOKING " +
            "order by booking.date ASC")
    List<Booking> findNewBookingByCustomerID(@Param("customerId") String customerId);

    @Query("select DISTINCT booking from Booking booking where " +
            "booking.worker.id = :workerId and " +
            "booking.status <> com.rmit.sept.monday15302.model.BookingStatus.NEW_BOOKING " +
            "order by booking.date DESC")
    List<Booking> findPastBookingByWorkerID(@Param("workerId") String adminID);

    @Query("select DISTINCT booking from Booking booking where "+
            "booking.worker.id = :workerId and " +
            "booking.status = com.rmit.sept.monday15302.model.BookingStatus.NEW_BOOKING " +
            "order by booking.date ASC")
    List<Booking> findNewBookingByWorkerID(@Param("workerId") String adminID);

    @Modifying
    @Transactional
    @Query("UPDATE Booking booking SET booking.status = :status WHERE booking.id = :bookingId")
    void updateBookingStatus(@Param("bookingId") String bookingId, @Param("status") BookingStatus status);

    @Query("select DISTINCT booking from Booking booking where " +
            "booking.worker.id = :worker_id and booking.date = :date and booking.status = " +
            "com.rmit.sept.monday15302.model.BookingStatus.NEW_BOOKING")
    List<Booking> findNewBookingByWorkerAndDate(String worker_id, Date date);

    @Query("select booking from Booking booking where booking.id = :id")
    Booking getBookingById(String id);

}
