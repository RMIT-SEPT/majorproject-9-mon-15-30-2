package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.Repositories.AdminDetailsRepository;
import com.rmit.sept.monday15302.Repositories.BookingRepository;
import com.rmit.sept.monday15302.Repositories.SessionRepository;
import com.rmit.sept.monday15302.Repositories.WorkerDetailsRepository;
import com.rmit.sept.monday15302.exception.AdminDetailsException;
import com.rmit.sept.monday15302.exception.BookingException;
import com.rmit.sept.monday15302.exception.WorkerDetailsException;
import com.rmit.sept.monday15302.exception.WorkingHoursException;
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
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

import static org.mockito.Mockito.times;

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
    private static AdminDetails admin;
    private static List<Session> sessions;
    private static List<WorkerDetails> workers;
    private static String sessionId = "s1";

    @Before
    public void setup() throws ParseException {
        User user = new User("worker", "*", UserType.ROLE_WORKER);
        User user2 = new User("admin", "*", UserType.ROLE_ADMIN);
        admin = new AdminDetails("Business", service, user2);
        admin.setId(adminId);
        worker = new WorkerDetails(user, "John",
                "Smith", admin, "0123456789");
        worker.setId(workerId);

        session = new Session(worker, 1, "08:00:00", "09:00:00", service);
        session.setId(sessionId);
        sessionCreated = new SessionCreated(1,
                "08:00:00", "09:00:00", workerId);
        sessions = Arrays.asList(session);
        workers = Arrays.asList(worker);
        Mockito.when(sessionRepository.findByWorkerIdAndService(workerId, service))
                .thenReturn(sessions);
        Mockito.when(workerDetailsRepository.getByIdAndAdminId(workerId, adminId)).thenReturn(worker);
        Mockito.when(adminDetailsRepository.getServiceByAdminId(adminId)).thenReturn(service);
        Mockito.when(workerDetailsRepository.findByAdminId(adminId)).thenReturn(workers);
        Mockito.when(sessionRepository.findByWorkerIdAndDay(workerId, 1)).thenReturn(sessions);
        Mockito.when(workerDetailsRepository.getWorkerById(workerId)).thenReturn(worker);
        Mockito.when(sessionRepository.findByWorkerId(workerId)).thenReturn(sessions);
        Mockito.when(sessionRepository.getSessionById(sessionId)).thenReturn(session);
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
        List<Session> toMock = new ArrayList<>();
        Mockito.when(sessionRepository.findByWorkerIdAndDay(workerId, 1)).thenReturn(toMock);
        sessionService.saveSession(sessionCreated);
        Mockito.verify(sessionRepository,
                Mockito.times(0)).save(session);
    }

    @Test(expected = AdminDetailsException.class)
    public void validateStartAndEndTime_throwException_ifInvalidTime()
            throws AdminDetailsException, ParseException {
        sessionService.validateStartAndEndTime(new Session(worker, 1,
                "09:00:00", "08:00:00", service));
    }

    @Test(expected = WorkingHoursException.class)
    public void validateSessionByWorkingHours_throwException_ifStartTimeBeforeWorkingHours()
            throws WorkingHoursException, ParseException {
        Mockito.when(workingHoursService.getOpeningHoursByDayAndAdmin(1, adminId))
                .thenReturn(new WorkingHours(admin, 1,
                        "08:00:00", "17:00:00", "2020-12-12"));
        sessionService.validateSessionByWorkingHours(new Session(worker, 1,
                "07:00:00", "08:00:00", service), adminId);
    }

    @Test(expected = WorkingHoursException.class)
    public void validateSessionByWorkingHours_throwException_ifEndTimeExceedsWorkingHours()
            throws WorkingHoursException, ParseException {
        Mockito.when(workingHoursService.getOpeningHoursByDayAndAdmin(1, adminId))
                .thenReturn(new WorkingHours(admin, 1,
                        "08:00:00", "17:00:00", "2020-12-12"));
        sessionService.validateSessionByWorkingHours(new Session(worker, 1,
                "16:00:00", "18:00:00", service), adminId);
    }

    @Test(expected = AdminDetailsException.class)
    public void validateSessionByTime_throwException_ifInvalidStartTime()
            throws AdminDetailsException, ParseException {
        Mockito.when(sessionRepository.findByWorkerIdAndDay(workerId, 1))
                .thenReturn(sessions);
        sessionService.validateSessionByTime(new Session(worker, 1,
                "08:30:00", "10:00:00", service), false);
    }

    @Test(expected = AdminDetailsException.class)
    public void validateSessionByTime_throwException_ifInvalidEndTime()
            throws AdminDetailsException, ParseException {
        Mockito.when(sessionRepository.findByWorkerIdAndDay(workerId, 1))
                .thenReturn(sessions);
        sessionService.validateSessionByTime(new Session(worker, 1,
                "07:00:00", "08:30:00", service), false);
    }

    @Test(expected = AdminDetailsException.class)
    public void validateSessionByTime_throwException_ifInvalidStartAndEndTime()
            throws AdminDetailsException, ParseException {
        Mockito.when(sessionRepository.findByWorkerIdAndDay(workerId, 1))
                .thenReturn(sessions);
        sessionService.validateSessionByTime(new Session(worker, 1,
                "07:00:00", "10:00:00", service), false);
    }

    @Test
    public void isWithinRange_returnTrue_ifNewSessionTimeIsCollapsed() throws ParseException {
        assert(sessionService.isWithinRange(Utility.convertStringToTime("08:30:00"),
        Utility.convertStringToTime("08:00:00"), Utility.convertStringToTime("09:00:00")));
    }

    @Test
    public void isWithinRange_returnFalse_ifNewSessionTimeIsNotCollapsed() throws ParseException {
        assert(!sessionService.isWithinRange(Utility.convertStringToTime("07:00:00"),
                Utility.convertStringToTime("08:00:00"), Utility.convertStringToTime("09:00:00")));
    }

    @Test
    public void getSessionsByWorkerAndDay_returnSessions_ifSessionsFound() {
        assert(sessionService.getSessionsByWorkerIdAndDay(workerId, 1).contains(session));
    }

    @Test(expected = WorkerDetailsException.class)
    public void getSessionsByWorkerAndDay_throwException_ifNoSessionsFound() {
        sessionService.getSessionsByWorkerIdAndDay("123", 4);
    }

    @Test
    public void getAvailableSession_removeSession_ifWorkerAlreadyBooked() throws ParseException {
        Date today = new Date();
        Date date = new Date(today.getTime() + (1000 * 60 * 60 * 24));
        String dateAsString = Utility.getDateAsString(date);
        int day = Utility.convertDateToDay(date);

        Session session = new Session(worker, day,
                "08:00:00", "09:00:00", service);
        List<Session> mockedSessions = Arrays.asList(session);

        Booking booking = new Booking(new CustomerDetails(), worker,
                BookingStatus.NEW_BOOKING, dateAsString, "08:00:00",
                "09:00:00", service, Confirmation.PENDING);
        List<Booking> bookings = Arrays.asList(booking);

        SessionReturn exclude = new SessionReturn(dateAsString,
                "08:00:00", "09:00:00");

        Mockito.when(bookingService
                .getUnavailableSessions(workerId, dateAsString))
                .thenReturn(bookings);
        Mockito.when(sessionRepository
                .findByWorkerIdAndService(workerId, service))
                .thenReturn(mockedSessions);

        assert(!sessionService.getAvailableSession(workerId, service)
                .contains(exclude));
    }

    @Test
    public void getSessionsByWorkerId_returnSessions_ifSessionsFound() {
        assert(sessionService.getSessionsByWorkerId(workerId).contains(session));
    }

    @Test(expected = AdminDetailsException.class)
    public void getSessionsByAdminId_throwException_ifNoSessionsFound() throws AdminDetailsException {
        List<WorkerDetails> list = new ArrayList<>();
        Mockito.when(workerDetailsRepository.findByAdminId("123")).thenReturn(list);
        sessionService.getSessionsByAdminId("123");
    }

    @Test
    public void getSessionsByAdminId_returnSessions_ifSessionFound() {
        assert(!sessionService.getSessionsByAdminId(adminId).isEmpty());
    }

    @Test(expected = AdminDetailsException.class)
    public void getSessionById_throwException_ifSessionNotFound() {
        sessionService.getSessionById("123");
    }

    @Test
    public void getSessionById_returnSession_ifSessionFound() {
        assert(sessionService.getSessionById(sessionId) != null);
    }

    @Test(expected = AdminDetailsException.class)
    public void updateSession_throwException_ifNoSessionFound()
            throws AdminDetailsException, ParseException {
        sessionService.updateSession(sessionCreated, "123");
    }

    @Test
    public void updateSession_returnSession_ifSessionUpdated() throws ParseException {
        Mockito.when(sessionRepository.save(session)).thenReturn(session);
        // when
        sessionService.updateSession(sessionCreated, sessionId);
        // then
        Mockito.verify(sessionRepository, times(1)).save(session);
    }

}
