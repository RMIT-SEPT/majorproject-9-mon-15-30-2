package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.Repositories.AdminDetailsRepository;
import com.rmit.sept.monday15302.Repositories.BookingRepository;
import com.rmit.sept.monday15302.Repositories.WorkerDetailsRepository;
import com.rmit.sept.monday15302.Repositories.WorkingHoursRepository;
import com.rmit.sept.monday15302.model.AdminDetails;
import com.rmit.sept.monday15302.model.Booking;
import com.rmit.sept.monday15302.model.CustomerDetails;
import com.rmit.sept.monday15302.model.WorkerDetails;
import com.rmit.sept.monday15302.model.WorkingHours;
import com.rmit.sept.monday15302.services.BookingService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class BookingServiceTest {

    @Autowired
    private BookingService bookingService;

    @MockBean
    private BookingRepository bookingRepository;

    @MockBean
    private AdminDetailsRepository adminDetailsRepository;

    @MockBean
    private WorkerDetailsRepository workerDetailsRepository;

    @MockBean
    private WorkingHoursRepository workingHoursRepository;

    @Before
    public void setup() throws ParseException {
        Booking booking = new Booking();
        CustomerDetails customer = new CustomerDetails();
        customer.setId("123");
        booking.setCustomer(customer);
        booking.setDate("2020-09-02");
        booking.setStartTime("17:00:00");
        booking.setEndTime("18:00:00");
        List<Booking> bookingList = new ArrayList<>();
        bookingList.add(booking);

        Mockito.when(bookingRepository.findPastBookingByCustomerID(booking.getCustomer().getId()))
                .thenReturn(bookingList);

        Mockito.when(bookingRepository.findNewBookingByCustomerID(booking.getCustomer().getId()))
                .thenReturn(bookingList);
        
        AdminDetails admin = new AdminDetails();
        admin.setId("a1");
        admin.setService("Massage");
        List<AdminDetails> adminList = new ArrayList<>();
        adminList.add(admin);
        List<String> adminIdList = new ArrayList<>();
        adminIdList.add(admin.getId());
        WorkerDetails worker = new WorkerDetails();
        worker.setId("w1");
        worker.setAdmin(admin);
        List<WorkerDetails> workerList = new ArrayList<>();
        workerList.add(worker);
        
        Mockito.when(adminDetailsRepository.getAdminIdFromService(admin.getService()))
            .thenReturn(adminIdList);

        Mockito.when(workerDetailsRepository.findByAdminId(admin.getId()))
            .thenReturn(workerList);

        Mockito.when(workerDetailsRepository.getAdminIdFromWorkerId(worker.getId()))
            .thenReturn(admin.getId());
        
        Mockito.when(adminDetailsRepository.getServiceByAdminId(admin.getId()))
            .thenReturn(admin.getService());
        
        List<String> serviceList = new ArrayList<>();
        serviceList.add(admin.getService());

        Mockito.when(adminDetailsRepository.getAllServices())
            .thenReturn(serviceList);
        
        Mockito.when(workerDetailsRepository.findAll())
            .thenReturn(workerList);

        Mockito.when(bookingRepository.findNewBookingByWorkerAndDate(worker.getId(), booking.getDate()))
            .thenReturn(bookingList);

        WorkingHours hours = new WorkingHours();
        hours.setAdminId(admin);
        hours.setId("h1");
        hours.setDate("2020-09-15");
        hours.setDay(3);
        hours.setStartTime("8:00:00");
        hours.setEndTime("10:00:00");
        admin.addWorkingHours(hours);
        Mockito.when(workingHoursRepository.findByAdmin_idAndDay(admin.getId(), hours.getDay()))
            .thenReturn(hours);   
    }

    @Test
    public void findPastBookings_returnTrue_ifOneBookingIsFound() {
        String customerId = "123";
        assert (bookingService.getAllPastBookings(customerId).size() == 1);
    }

    @Test
    public void findNewBookingByCustomerID_returnTrue_ifOneBookingIsFound() throws ParseException
    {
        String customerId = "123";
        assert(bookingService.getAllNewBookings(customerId).size() == 1);
    }

    @Test
    public void getWorkerByService_returnTrue_ifOneBookingIsFound()
    {
        String service = "Massage";
        String id = "w1";
        assert(bookingService.getWorkerByService(service).size() == 1);
        assert(bookingService.getWorkerByService(service).get(0).getId() == id);
    }

    @Test
    public void getServiceByWorker_returnTrue_ifOneBookingIsFound()
    {
        String service = "Massage";
        String id = "w1";
        assert(bookingService.getServiceByWorker(id) == service);
    }

    @Test
    public void getAllServices_returnTrue_ifOneBookingIsFound()
    {
        String service = "Massage";
        assert(bookingService.getAllServices().size() == 1);
        assert(bookingService.getAllServices().get(0) == service);
    }

    @Test
    public void getAllWorkers_returnTrue_ifOneBookingIsFound()
    {
        String id = "w1";
        List<WorkerDetails> list = new ArrayList<>();
        for (WorkerDetails w:bookingService.getAllWorkers())
        {
            list.add(w);
        }
        
        assert(list.size() == 1);
        assert(list.get(0).getId() == id);
    }

    @Test
    public void getOpeningHours() throws ParseException
    {
        String workerId = "w1";
        String date = "2020-09-15";
        assert(bookingService.getOpeningHours(workerId, date).size() == 2);
    }

    @Test
    public void getUnavailableSessions() throws ParseException
    {
        String workerId = "w1";
        String date = "2020-09-02";
        assert(bookingService.getUnavailableSessions(workerId,date).size() == 1);
    }
}
