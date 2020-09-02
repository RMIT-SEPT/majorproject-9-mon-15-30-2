package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.Repositories.BookingRepository;
import com.rmit.sept.monday15302.model.Booking;
import com.rmit.sept.monday15302.model.CustomerDetails;
import com.rmit.sept.monday15302.services.BookingService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BookingServiceTest {

    @Autowired
    private BookingService bookingService;

    @MockBean
    private BookingRepository bookingRepository;

    @Before
    public void setup() {
        Booking booking = new Booking();
        CustomerDetails customer = new CustomerDetails();
        customer.setId("123");
        booking.setCustomer(customer);
        List<Booking> bookingList = new ArrayList<>();
        bookingList.add(booking);

        Mockito.when(bookingRepository.findPastBookingByCustomerID(booking.getCustomer().getId()))
                .thenReturn(bookingList);
    }

    @Test
    public void findPastBookings_returnOne_ifOneBookingIsFound() {
        String customerId = "123";

        assert(bookingService.getAllPastBookings(customerId).size() == 1);
    }
}
