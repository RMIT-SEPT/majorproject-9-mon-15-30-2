package com.rmit.sept.monday15302;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.sept.monday15302.model.*;
import com.rmit.sept.monday15302.security.CustomAuthenticationSuccessHandler;
import com.rmit.sept.monday15302.security.JwtAuthenticationEntryPoint;
import com.rmit.sept.monday15302.security.JwtAuthenticationFilter;
import com.rmit.sept.monday15302.services.*;
import com.rmit.sept.monday15302.utils.Request.BookingConfirmation;
import com.rmit.sept.monday15302.utils.Response.SessionReturn;
import com.rmit.sept.monday15302.utils.Utility;
import com.rmit.sept.monday15302.web.BookingController;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest(BookingController.class)
@AutoConfigureMockMvc(addFilters=false)
public class BookingControllerTest {

    @Autowired
    private MockMvc mvc;

    @MockBean
    private BookingService service;

    @MockBean
    private WorkerDetailsService workerDetailsService;

    @MockBean
    private AdminDetailsService adminDetailsService;

    @MockBean
    private MapValidationErrorService mapValidationErrorService;

    @MockBean
    private SessionService sessionService;

    @MockBean
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @MockBean
    private CustomUserService customUserService;

    @MockBean
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @MockBean
    private CustomAuthenticationSuccessHandler successHandler;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    private ObjectMapper objectMapper = new ObjectMapper();
    private static String customerId = "c1";
    private static String workerId = "w1";
    private static String adminId = "a1";
    private static String bookingId = "b1";

    @Test
    public void givenPastBookingsForCustomer_whenGetPastBookingsForCustomer_thenReturnJsonArray()
            throws Exception {

        Booking booking1 = new Booking();
        booking1.setStatus(BookingStatus.PAST_BOOKING);

        Booking booking2 = new Booking();
        booking2.setStatus(BookingStatus.CANCELLED_BOOKING);

        List<Booking> bookings = Arrays.asList(booking1, booking2);

        given(service.getPastBookingsByCustomerId(customerId)).willReturn(bookings);

        mvc.perform(get("/customer/historybookings/{id}", customerId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].status", is(BookingStatus.PAST_BOOKING.toString())))
                .andExpect(jsonPath("$[1].status", is(BookingStatus.CANCELLED_BOOKING.toString())));
    }

    @Test
    public void givenNewBookingsForCustomer_whenGetNewBookingsForCustomer_thenReturnJsonArray()
            throws Exception {

        Booking booking = new Booking();
        booking.setStatus(BookingStatus.NEW_BOOKING);

        List<Booking> bookings = Arrays.asList(booking);

        given(service.getNewBookingsByCustomerId(customerId)).willReturn(bookings);

        mvc.perform(get("/customer/newbookings/{id}", customerId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].status", is(BookingStatus.NEW_BOOKING.toString())));
    }

    @Test
    public void givenPastBookingsForAdmin_whenGetPastBookingsForAdmin_thenReturnJsonArray()
            throws Exception {

        Booking booking1 = new Booking();
        booking1.setStatus(BookingStatus.PAST_BOOKING);

        Booking booking2 = new Booking();
        booking2.setStatus(BookingStatus.CANCELLED_BOOKING);

        List<Booking> bookings = Arrays.asList(booking1, booking2);

        given(service.getPastBookingsByAdminID(adminId)).willReturn(bookings);

        mvc.perform(get("/admin/pastBookingsAdmin/{adminID}", adminId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].status", is(BookingStatus.PAST_BOOKING.toString())))
                .andExpect(jsonPath("$[1].status", is(BookingStatus.CANCELLED_BOOKING.toString())));
    }

    @Test
    public void givenNewBookingsForAdmin_whenGetNewBookingsForAdmin_thenReturnJsonArray()
            throws Exception {

        Booking booking1 = new Booking();
        booking1.setStatus(BookingStatus.PAST_BOOKING);

        Booking booking2 = new Booking();
        booking2.setStatus(BookingStatus.CANCELLED_BOOKING);

        List<Booking> bookings = Arrays.asList(booking1, booking2);

        given(service.getNewBookingsByAdminID(adminId)).willReturn(bookings);

        mvc.perform(get("/admin/newBookingsAdmin/{adminID}", adminId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].status", is(BookingStatus.PAST_BOOKING.toString())))
                .andExpect(jsonPath("$[1].status", is(BookingStatus.CANCELLED_BOOKING.toString())));
    }

    @Test
    public void givenWorkersWithService_whenGetWorkersByService_thenReturnJsonArray()
            throws Exception {
        String workerId2 = "w2";
        String service = "Haircut";

        WorkerDetails worker1 = new WorkerDetails();
        worker1.setId(workerId);

        WorkerDetails worker2 = new WorkerDetails();
        worker2.setId(workerId2);

        List<String> adminList = Arrays.asList(adminId);

        List<WorkerDetails> workers = Arrays.asList(worker1, worker2);

        given(adminDetailsService.getAdminIdByService(service)).willReturn(adminList);
        given(workerDetailsService.getWorkersByAdminIds(adminList)).willReturn(workers);

        mvc.perform(get("/customer/makebooking/workers/{service}", service)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(workerId)))
                .andExpect(jsonPath("$[1].id", is(workerId2)));
    }

    @Test
    public void fetchAvailableSessionsByWorkerAndService() throws Exception {
        String service = "Haircut";
        SessionReturn session1 = new SessionReturn("2020-09-12",
                "08:00:00", "09:00:00");
        List<SessionReturn> sessions = Arrays.asList(session1);
        given(sessionService.getAvailableSession(workerId, service)).willReturn(sessions);
        mvc.perform(get("/customer/makebooking/sessions/{workerId}/{service}", workerId, service)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].date", is(Utility.getDateAsString(session1.getDate()))))
                .andExpect(jsonPath("$[0].startTime", is(Utility.getTimeAsString(session1.getStartTime()))));
    }

    @Test
    public void saveBooking_itShouldReturnStatusOk() throws Exception {
        User user1 = new User("customer", "******", UserType.ROLE_CUSTOMER);
        user1.setId(customerId);
        User user2 = new User("admin", "******", UserType.ROLE_ADMIN);
        user1.setId(adminId);
        User user3 = new User("worker", "******", UserType.ROLE_WORKER);
        user1.setId(workerId);

        AdminDetails admin = new AdminDetails("Haircut", "Business", user2);
        admin.setId(user2.getId());
        CustomerDetails customer = new CustomerDetails(user1, "John", "Smith",
                "Melbourne", "0123456789", "john@mail.com");
        customer.setId(user1.getId());
        WorkerDetails worker = new WorkerDetails(user3, "Julia", "Baker",
                admin, "0123445556");
        worker.setId(user3.getId());
        Booking booking = new Booking(customer, worker, BookingStatus.NEW_BOOKING,
                "2021-09-02", "8:00:00", "9:00:00",
                "Haircut", Confirmation.PENDING);
        booking.setId(bookingId);
        given(service.saveBooking(Mockito.any(Booking.class))).willReturn(booking);

        String jsonString = objectMapper.writeValueAsString(booking);

        mvc.perform(post("/customer/createbooking")
                .content(jsonString)
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(content().contentType("application/json"));
    }

    @Test
    public void testGetBookingById() throws Exception {
        Booking booking = new Booking();
        booking.setId(bookingId);

        given(service.getBookingById(bookingId)).willReturn(booking);

        mvc.perform(get("/admin/booking/{bookingId}", bookingId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(bookingId)));
    }

    @Test
    public void updateBookingStatus_returnStatusOK() throws Exception {
        Booking booking = new Booking();

        given(service.updateBooking(Mockito.any(BookingConfirmation.class), eq(bookingId)))
                .willReturn(booking);

        String jsonString = objectMapper.writeValueAsString(booking);

        mvc.perform(put("/admin/confirmBooking/{bookingId}", bookingId)
                .content(jsonString)
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"));
    }
}
