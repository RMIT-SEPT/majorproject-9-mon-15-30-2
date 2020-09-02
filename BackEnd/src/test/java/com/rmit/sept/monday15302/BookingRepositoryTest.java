package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.Repositories.*;
import com.rmit.sept.monday15302.model.*;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

// @AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@DataJpaTest
@RunWith(SpringRunner.class)
public class BookingRepositoryTest {
    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private CustomerDetailsRepository customerDetailsRepository;

    @Autowired
    private WorkerDetailsRepository workerDetailsRepository;

    @Autowired
    private AdminDetailsRepository adminDetailsRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    TestEntityManager entityManager;

    public static User user = new User();
    public static User user2 = new User();
    public static User user3 = new User();
    public static CustomerDetails customer = new CustomerDetails();
    public static AdminDetails admin = new AdminDetails();
    public static WorkerDetails worker = new WorkerDetails();

//    @BeforeClass
//    public void setup() {
//        customer = new CustomerDetails("123", "John", "Smith",
//                "20 Melbourne St", "0499778885", "johnsmith@gmail.com");
//        customerDetailsRepository.save(customer);
//
//        admin = new AdminDetails("789", "Melbourne Salon", "Haircut");
//        adminDetailsRepository.save(admin);
//
//        worker = new WorkerDetails("345", "Alice", "Smith", admin);
//        workerDetailsRepository.save(worker);
//    }

    @Test
    public void injectedComponentsAreNotNull(){
        assertThat(customerDetailsRepository).isNotNull();
        assertThat(adminDetailsRepository).isNotNull();
        assertThat(workerDetailsRepository).isNotNull();
        assertThat(bookingRepository).isNotNull();
        assertThat(userRepository).isNotNull();
    }

    @Test
    public void displayPastBooking_returnsTrue_ifNoBookingsFound() {
        assert(bookingRepository.findPastBookingByCustomerID("123").size() == 0);
    }

    @Test
    public void displayPastBooking_returnsTrue_ifOneBookingFound() throws ParseException {
        // user.setId("123");
        user.setUserName("customer");
        user.setPassword("*");
        user.setType(UserType.CUSTOMER);

        // user2.setId("345");
        user2.setUserName("worker");
        user2.setPassword("*");
        user2.setType(UserType.WORKER);

        // user3.setId("789");
        user3.setUserName("admin");
        user3.setPassword("*");
        user3.setType(UserType.ADMIN);

        entityManager.persist(user);
        entityManager.flush();
        entityManager.persist(user2);
        entityManager.flush();
        entityManager.persist(user3);
        entityManager.flush();

        customer.setUser(user);
        customer.setfName("John");
        customer.setlName("Smith");
        customer.setAddress("20 Melbourne St");
        customer.setEmail("johnsmith@gmail.com");
        customer.setPhoneNumber("0455667778");
        entityManager.persist(customer);
        entityManager.flush();

        admin.setUser(user3);
        admin.setAdminName("Business");
        admin.setService("Haircut");
        entityManager.persist(admin);
        entityManager.flush();

        worker.setUser(user2);
        worker.setAdmin(admin);
        worker.setfName("Alex");
        worker.setlName("Abc");
        entityManager.persist(worker);
        entityManager.flush();

        Booking booking = new Booking();
        booking.setCustomer(customer);
        booking.setWorker(worker);
        booking.setStatus(BookingStatus.PAST_BOOKING);
        booking.setService("Haircut");
        booking.setDate("2020-09-02");
        booking.setStartTime("17:00:00");
        booking.setEndTime("18:00:00");

        entityManager.persist(booking);
        entityManager.flush();
        assert(bookingRepository.findPastBookingByCustomerID(customer.getId()).size() == 1);
    }

    @Test
    public void displayNewBooking_returnsTrue_ifOneBookingFound() throws ParseException {
        // user.setId("123");
        user.setUserName("customer");
        user.setPassword("*");
        user.setType(UserType.CUSTOMER);

        // user2.setId("345");
        user2.setUserName("worker");
        user2.setPassword("*");
        user2.setType(UserType.WORKER);

        // user3.setId("789");
        user3.setUserName("admin");
        user3.setPassword("*");
        user3.setType(UserType.ADMIN);

        entityManager.persist(user);
        entityManager.flush();
        entityManager.persist(user2);
        entityManager.flush();
        entityManager.persist(user3);
        entityManager.flush();

        customer.setUser(user);
        customer.setfName("John");
        customer.setlName("Smith");
        customer.setAddress("20 Melbourne St");
        customer.setEmail("johnsmith@gmail.com");
        customer.setPhoneNumber("0455667778");
        entityManager.persist(customer);
        entityManager.flush();

        admin.setUser(user3);
        admin.setAdminName("Business");
        admin.setService("Haircut");
        entityManager.persist(admin);
        entityManager.flush();

        worker.setUser(user2);
        worker.setAdmin(admin);
        worker.setfName("Alex");
        worker.setlName("Abc");
        entityManager.persist(worker);
        entityManager.flush();

        Booking booking = new Booking();
        booking.setCustomer(customer);
        booking.setWorker(worker);
        booking.setStatus(BookingStatus.NEW_BOOKING);
        booking.setService("Haircut");
        booking.setDate("2020-09-02");
        booking.setStartTime("17:00:00");
        booking.setEndTime("18:00:00");

        entityManager.persist(booking);
        entityManager.flush();
        List<Booking> list = new ArrayList<>();
        for (Booking t:bookingRepository.findNewBookingByCustomerID(customer.getId()))
        {
            list.add(t);
        }
        assert(list.size() == 1);
    }

    @Test
    public void findNewBookingByWorkerAndDate_returnsTrue_ifOneBookingFound() throws ParseException {
        // user.setId("123");
        user.setUserName("customer");
        user.setPassword("*");
        user.setType(UserType.CUSTOMER);

        // user2.setId("345");
        user2.setUserName("worker");
        user2.setPassword("*");
        user2.setType(UserType.WORKER);

        // user3.setId("789");
        user3.setUserName("admin");
        user3.setPassword("*");
        user3.setType(UserType.ADMIN);

        entityManager.persist(user);
        entityManager.flush();
        entityManager.persist(user2);
        entityManager.flush();
        entityManager.persist(user3);
        entityManager.flush();

        customer.setUser(user);
        customer.setfName("John");
        customer.setlName("Smith");
        customer.setAddress("20 Melbourne St");
        customer.setEmail("johnsmith@gmail.com");
        customer.setPhoneNumber("0455667778");
        entityManager.persist(customer);
        entityManager.flush();

        admin.setUser(user3);
        admin.setAdminName("Business");
        admin.setService("Haircut");
        entityManager.persist(admin);
        entityManager.flush();

        worker.setUser(user2);
        worker.setAdmin(admin);
        worker.setfName("Alex");
        worker.setlName("Abc");
        entityManager.persist(worker);
        entityManager.flush();

        Booking booking = new Booking();
        booking.setCustomer(customer);
        booking.setWorker(worker);
        booking.setStatus(BookingStatus.NEW_BOOKING);
        booking.setService("Haircut");
        booking.setDate("2020-09-02");
        booking.setStartTime("17:00:00");
        booking.setEndTime("18:00:00");

        entityManager.persist(booking);
        entityManager.flush();
        assert(bookingRepository.findNewBookingByWorkerAndDate(booking.getWorker().getId(), booking.getDate()).size() == 1);
    }

    @Test
    public void updateBookingStatus_returnsTrue_ifOneBookingFound() throws ParseException {
        // user.setId("123");
        user.setUserName("customer");
        user.setPassword("*");
        user.setType(UserType.CUSTOMER);

        // user2.setId("345");
        user2.setUserName("worker");
        user2.setPassword("*");
        user2.setType(UserType.WORKER);

        // user3.setId("789");
        user3.setUserName("admin");
        user3.setPassword("*");
        user3.setType(UserType.ADMIN);

        entityManager.persist(user);
        entityManager.flush();
        entityManager.persist(user2);
        entityManager.flush();
        entityManager.persist(user3);
        entityManager.flush();

        customer.setUser(user);
        customer.setfName("John");
        customer.setlName("Smith");
        customer.setAddress("20 Melbourne St");
        customer.setEmail("johnsmith@gmail.com");
        customer.setPhoneNumber("0455667778");
        entityManager.persist(customer);
        entityManager.flush();

        admin.setUser(user3);
        admin.setAdminName("Business");
        admin.setService("Haircut");
        entityManager.persist(admin);
        entityManager.flush();

        worker.setUser(user2);
        worker.setAdmin(admin);
        worker.setfName("Alex");
        worker.setlName("Abc");
        entityManager.persist(worker);
        entityManager.flush();

        Booking booking = new Booking();
        booking.setCustomer(customer);
        booking.setWorker(worker);
        booking.setStatus(BookingStatus.PAST_BOOKING);
        booking.setService("Haircut");
        booking.setDate("2020-09-02");
        booking.setStartTime("17:00:00");
        booking.setEndTime("18:00:00");

        entityManager.persist(booking);
        entityManager.flush();
        assert(bookingRepository.findPastBookingByCustomerID(customer.getId()).size() == 1);
        bookingRepository.updateBookingStatus(booking.getId(), BookingStatus.NEW_BOOKING);
        assert(bookingRepository.findPastBookingByCustomerID(customer.getId()).size() == 0);
    }
}
