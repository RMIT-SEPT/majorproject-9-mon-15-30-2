package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.Repositories.BookingRepository;
import com.rmit.sept.monday15302.model.*;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.text.ParseException;
import java.util.List;

@DataJpaTest
@RunWith(SpringRunner.class)
public class BookingRepositoryTest {
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    TestEntityManager entityManager;

    private static User user;
    private static User user2;
    private static User user3;
    private static CustomerDetails customer;
    private static AdminDetails admin;
    private static WorkerDetails worker;
    private static Booking pastBooking;
    private static Booking cancelledBooking;
    private static Booking newBooking;

    @Before
    public void setup() throws ParseException {
        user = new User("customer", "******", UserType.ROLE_CUSTOMER);
        user2 = new User("worker", "******", UserType.ROLE_WORKER);
        user3 = new User("admin", "******", UserType.ROLE_ADMIN);
        entityManager.persist(user);
        entityManager.persist(user2);
        entityManager.persist(user3);

        customer = new CustomerDetails(user, "John", "Smith", "20 Melbourne St",
                "0123456789", "johnsmith@gmail.com");
        entityManager.persist(customer);

        admin = new AdminDetails("Haircut", "Business", user3);
        entityManager.persist(admin);

        worker = new WorkerDetails(user2, "Alex", "Abc", admin,
                "0123445556");
        entityManager.persist(worker);

        pastBooking = new Booking(customer, worker, BookingStatus.PAST_BOOKING,
                "2020-09-02", "17:00:00", "18:00:00",
                "Haircut", Confirmation.CONFIRMED);
        cancelledBooking = new Booking(customer, worker, BookingStatus.CANCELLED_BOOKING,
                "2020-09-02", "17:00:00", "18:00:00",
                "Haircut", Confirmation.CANCELLED);
        newBooking = new Booking(customer, worker, BookingStatus.NEW_BOOKING,
                "2021-09-02", "17:00:00", "18:00:00",
                "Haircut", Confirmation.PENDING);
        entityManager.persist(pastBooking);
        entityManager.persist(cancelledBooking);
        entityManager.persist(newBooking);

        entityManager.flush();
    }

    @Test
    public void getPastBookingsByCustomerId_returnEmptyList_ifNoBookingsFound() {
        assert(bookingRepository.findPastBookingByCustomerID("1").isEmpty());
    }

    @Test
    public void getPastBookingsByCustomerId_returnBookings_ifBookingsFound() {
        List<Booking> list = bookingRepository.findPastBookingByCustomerID(customer.getId());
        assert(list.contains(pastBooking) && list.contains(cancelledBooking));
    }

    @Test
    public void getNewBookingsByCustomerId_returnBookings_ifBookingsFound() {
        assert(bookingRepository.findNewBookingByCustomerID(customer.getId()).contains(newBooking));
    }

    @Test
    public void getNewBookingsByCustomerId_returnEmptyList_ifNoBookingsFound() {
        assert(bookingRepository.findNewBookingByCustomerID("123").isEmpty());
    }

    @Test
    public void findNewBookingByWorkerAndDate_returnBookings_ifBookingsFound() {
        assert(bookingRepository.findNewBookingByWorkerAndDate(worker.getId(),
                newBooking.getDate()).contains(newBooking));
    }

    @Test
    public void findNewBookingByWorkerAndDate_returnEmptyList_ifNoBookingsFound() {
        assert(bookingRepository.findNewBookingByWorkerAndDate("1",
                newBooking.getDate()).isEmpty());
    }

    @Test
    public void updateBookingStatus_returnsTrue_ifStatusIsChanged() {
        BookingStatus status = BookingStatus.PAST_BOOKING;
        bookingRepository.updateBookingStatus(newBooking.getId(), status);
        assert(bookingRepository.findNewBookingByCustomerID(customer.getId()).isEmpty());
    }
}
