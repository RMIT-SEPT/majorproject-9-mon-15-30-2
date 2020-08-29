package com.rmit.sept.monday15302.Repositories;

import com.rmit.sept.monday15302.model.Booking;
import com.rmit.sept.monday15302.model.BookingStatus;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface BookingRepository extends CrudRepository<Booking, Integer> {

    @Query("select DISTINCT booking from Booking booking where " +
            "booking.customer.user.id = :customerId and " +
            "booking.status <> com.rmit.sept.monday15302.model.BookingStatus.NEW_BOOKING")
    Iterable<Booking> findPastBookingByCustomerID(@Param("customerId") String customerId);

    @Query("select DISTINCT booking from Booking booking where " +
            "booking.customer.user.id = :customerId and " +
            "booking.status = com.rmit.sept.monday15302.model.BookingStatus.NEW_BOOKING")
    Iterable<Booking> findNewBookingByCustomerID(@Param("customerId") String customerId);

    @Modifying
    @Transactional
    @Query("UPDATE Booking booking SET booking.status = :status WHERE booking.id = :bookingId")
    void updateBookingStatus(@Param("bookingId") String bookingId, @Param("status") BookingStatus status);
}
