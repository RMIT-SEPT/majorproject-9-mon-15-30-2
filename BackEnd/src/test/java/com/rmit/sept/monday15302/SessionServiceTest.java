package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.Repositories.AdminDetailsRepository;
import com.rmit.sept.monday15302.Repositories.BookingRepository;
import com.rmit.sept.monday15302.Repositories.SessionRepository;
import com.rmit.sept.monday15302.Repositories.WorkerDetailsRepository;
import com.rmit.sept.monday15302.exception.BookingException;
import com.rmit.sept.monday15302.model.*;
import com.rmit.sept.monday15302.services.BookingService;
import com.rmit.sept.monday15302.services.SessionService;
import com.rmit.sept.monday15302.services.WorkingHoursService;
import com.rmit.sept.monday15302.utils.Request.SessionCreated;
import com.rmit.sept.monday15302.utils.Response.SessionReturn;
import com.rmit.sept.monday15302.utils.Utility;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.text.ParseException;
import java.util.Arrays;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class SessionServiceTest {
    @Autowired
    private SessionService sessionService;

    @MockBean
    private SessionRepository sessionRepository;

    @MockBean
    private BookingService bookingService;

    @MockBean
    private BookingRepository bookingRepository;

    @MockBean
    private WorkingHoursService workingHoursService;

    @MockBean
    private AdminDetailsRepository adminDetailsRepository;

    @MockBean
    private WorkerDetailsRepository workerDetailsRepository;

    private static String workerId = "w1";
    private static String service = "Haircut";
    private static String adminId = "a1";
    private static SessionCreated sessionCreated;
    private static Session session;
    private static WorkerDetails worker;

    @Before
    public void setup() throws ParseException {
        User user = new User("worker", "*", UserType.WORKER);
        User user2 = new User("admin", "*", UserType.ADMIN);
        AdminDetails admin = new AdminDetails("Business", service, user2);
        admin.setId(adminId);
        worker = new WorkerDetails(user, "John",
                "Smith", admin, "0123456789");
        worker.setId(workerId);

        session = new Session(worker, 1, "08:00:00", "09:00:00", service);
        session.setId("s1");
        sessionCreated = new SessionCreated(1,
                "08:00:00", "09:00:00", workerId);
        List<Session> sessions = Arrays.asList(session);
        Mockito.when(sessionRepository.findByWorkerIdAndService(workerId, service))
                .thenReturn(sessions);
        Mockito.when(workerDetailsRepository.getWorkerById(workerId)).thenReturn(worker);
        Mockito.when(adminDetailsRepository.getServiceByAdminId(adminId)).thenReturn(service);
    }

    @Test
    public void getAvailableSession_SessionsList_ifSessionsFound() throws ParseException {
        List<SessionReturn> sessions = sessionService.getAvailableSession(workerId, service);
        boolean isTrue = true;
        for(SessionReturn session : sessions) {
            if(Utility.convertDateToDay(session.getDate()) != 1) {
                isTrue = false;
            }
        }
        assert(isTrue);
    }

    @Test(expected = BookingException.class)
    public void getAvailableSession_throwException_ifNoSessionsFound()
            throws BookingException, ParseException {
        sessionService.getAvailableSession("w2", "Sale");
    }

    @Test
    public void createNewSession_returnSession_ifSessionAdded() throws ParseException {
        Session session = new Session(worker, 1, "08:00:00", "09:00:00", service);
        session.setId("s1");
        SessionCreated sessionCreated = new SessionCreated(1,
                "08:00:00", "09:00:00", workerId);
        sessionService.saveSession(sessionCreated);
        Mockito.verify(sessionRepository,
                Mockito.times(0)).save(session);
    }


}
