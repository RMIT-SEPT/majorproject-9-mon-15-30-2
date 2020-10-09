package com.rmit.sept.monday15302.services;

import com.rmit.sept.monday15302.Repositories.AdminDetailsRepository;
import com.rmit.sept.monday15302.Repositories.SessionRepository;
import com.rmit.sept.monday15302.Repositories.WorkerDetailsRepository;
import com.rmit.sept.monday15302.exception.AdminDetailsException;
import com.rmit.sept.monday15302.exception.BookingException;
import com.rmit.sept.monday15302.exception.WorkerDetailsException;
import com.rmit.sept.monday15302.exception.WorkingHoursException;
import com.rmit.sept.monday15302.model.*;
import com.rmit.sept.monday15302.utils.Request.SessionCreated;
import com.rmit.sept.monday15302.utils.Response.SessionReturn;
import com.rmit.sept.monday15302.utils.Utility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;

@Service
public class SessionService {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private SessionRepository sessionRepository;

    @Autowired
    private WorkingHoursService workingHoursService;

    @Autowired
    private AdminDetailsRepository adminDetailsRepository;

    @Autowired
    private WorkerDetailsRepository workerDetailsRepository;

    public List<SessionReturn> getAvailableSession(String workerId, String service)
            throws ParseException {
        List<Session> sessions = sessionRepository.findByWorkerIdAndService(workerId, service);
        List<SessionReturn> toReturn = new ArrayList<>();

        // Get current date
        Date currentDate = new Date();
        Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("Australia/Sydney"));
        cal.setTime(currentDate);
        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH) + 1;
        int day = cal.get(Calendar.DAY_OF_MONTH);

        // Loop from current date to the end of the month and convert session from day to date
        int numDays = Utility.getWorkingDaysInMonth(month, year);

        for (int index = (day + 1); index <= numDays; index++) {
            // Check with the day in sessions
            Date date = Date.from(LocalDate.of(year, month, index)
                    .atStartOfDay(ZoneId.systemDefault()).toInstant());
            int currentDay = Utility.convertDateToDay(date);
            for (Session session : sessions) {
                if (session.getDay() == currentDay) {
                    toReturn.add(new SessionReturn(Utility.getDateAsString(date),
                            Utility.getTimeAsString(session.getStartTime()),
                            Utility.getTimeAsString(session.getEndTime())));
                }
            }
        }

        List<Integer> indexes = new ArrayList<>();

        // Filter list of sessions by worker's current bookings
        for (int i = 0; i != toReturn.size(); i++) {
            SessionReturn s = toReturn.get(i);
            List<Booking> bookings = bookingService.getUnavailableSessions(workerId,
                    Utility.getDateAsString(s.getDate()));
            if (!bookings.isEmpty()) {
                for (Booking booking : bookings) {
                    if (booking.getStartTime().equals(s.getStartTime())
                            && booking.getEndTime().equals(s.getEndTime())) {
                        indexes.add(i);
                    }
                }
            }
        }

        if (!indexes.isEmpty()) {
            for (int x = indexes.size() - 1; x >= 0; x--) {
                toReturn.remove(indexes.get(x));
            }
        }

        if (toReturn.isEmpty()) {
            throw new BookingException("Worker id " + workerId + " has no available sessions");
        }

        for (int i = 0; i != toReturn.size(); i++) {
            toReturn.get(i).setId(i);
        }

        return toReturn;
    }

    public Session saveSession(SessionCreated session) throws ParseException {
        WorkerDetails worker = workerDetailsRepository.getWorkerById(session.getWorkerId());
        String adminId = worker.getAdmin().getId();
        String service = adminDetailsRepository.getServiceByAdminId(adminId);

        Session newSession = new Session(worker, session.getDay(), session.getStartTime(),
                session.getEndTime(), service);
        // Validate hours
        validateStartAndEndTime(newSession);
        validateSessionByWorkingHours(newSession, adminId);
        validateSessionByTime(newSession, false);
        return sessionRepository.save(newSession);
    }

    public void validateSessionByWorkingHours(Session newSession, String adminId) {
        WorkingHours hours = workingHoursService.getOpeningHoursByDayAndAdmin(newSession.getDay(),
                adminId);
        if (hours != null) {
            Date startTime = hours.getStartTime();
            Date endTime = hours.getEndTime();
            Date newStartTime = newSession.getStartTime();
            Date newEndTime = newSession.getEndTime();
            if (!(isWithinRange(newStartTime, startTime, endTime)
                    && isWithinRange(newEndTime, startTime, endTime))) {
                throw new WorkingHoursException("Session is not within working hours (From "
                        + Utility.getTimeAsString(startTime) + " to "
                        + Utility.getTimeAsString(endTime) + ") ");
            }
        }
    }

    public void validateStartAndEndTime(Session newSession) {
        Date startTime = newSession.getStartTime();
        Date endTime = newSession.getEndTime();
        if (startTime.getTime() >= endTime.getTime()) {
            throw new AdminDetailsException("Start time cannot happen at the " +
                    "same time or before end time");
        }
    }


    public void validateSessionByTime(Session newSession, boolean isUpdated) {
        List<Session> sessions = sessionRepository.findByWorkerIdAndDay(newSession
                .getWorker().getId(), newSession.getDay());
        if (!sessions.isEmpty()) {
            for (Session session : sessions) {
                if (!(isUpdated && session.getId().equals(newSession.getId()))) {
                    Date newStartTime = newSession.getStartTime();
                    Date newEndTime = newSession.getEndTime();
                    Date startTime = session.getStartTime();
                    Date endTime = session.getEndTime();
                    if (isWithinRange(newStartTime, startTime, endTime)
                            || isWithinRange(newEndTime, startTime, endTime)
                            || (newStartTime.getTime() < startTime.getTime() && newEndTime.getTime() > endTime.getTime())) {
                        if (!newEndTime.equals(startTime) && !newStartTime.equals(endTime)) {
                            throw new AdminDetailsException("New session is collapsed with session "
                                    + Utility.getTimeAsString(startTime) + "-" + Utility.getTimeAsString(endTime));
                        }
                    }
                }
            }
        }
    }

    public boolean isWithinRange(Date actual, Date start, Date end) {
        return actual.getTime() >= start.getTime() && actual.getTime() <= end.getTime();
    }

    public List<Session> getSessionsByWorkerIdAndDay(String workerId, int day) {
        List<Session> sessions = sessionRepository.findByWorkerIdAndDay(workerId, day);
        if (sessions.isEmpty()) {
            throw new WorkerDetailsException("No sessions found");
        }
        return sessions;
    }

    public List<Session> getSessionsByWorkerId(String workerId) {
        return sessionRepository.findByWorkerId(workerId);
    }

    public List<SessionCreated> getSessionsByAdminId(String adminId) {
        List<SessionCreated> sessions = new ArrayList<>();
        List<WorkerDetails> workers = workerDetailsRepository.findByAdminId(adminId);
        if (!workers.isEmpty()) {
            for (WorkerDetails worker : workers) {
                List<Session> wSessions = getSessionsByWorkerId(worker.getId());
                if (!wSessions.isEmpty()) {
                    for (Session session : wSessions) {
                        SessionCreated toReturn = new SessionCreated(session.getDay(),
                                session.getStartTime(), session.getEndTime(), worker.getfName(),
                                worker.getlName(), session.getId());
                        sessions.add(toReturn);
                    }
                }
            }
        }
        if (sessions.isEmpty()) {
            throw new AdminDetailsException("No session found");
        }
        return sessions;
    }

    public Session getSessionById(String sessionId) {
        Session session = sessionRepository.getSessionById(sessionId);
        if (session == null) {
            throw new AdminDetailsException("Session with id " + sessionId + " not found");
        }
        return session;
    }

    public Session updateSession(SessionCreated session, String sessionId) throws ParseException {
        WorkerDetails worker = workerDetailsRepository.getWorkerById(session.getWorkerId());
        Session updatedSession = sessionRepository.getSessionById(sessionId);

        if (worker == null || updatedSession == null) {
            throw new AdminDetailsException("No worker or session found");
        }

        updatedSession.setStartTime(session.getStartTime());
        updatedSession.setEndTime(session.getEndTime());
        updatedSession.setDay(session.getDay());

        validateStartAndEndTime(updatedSession);
        validateSessionByWorkingHours(updatedSession, worker.getAdmin().getId());
        validateSessionByTime(updatedSession, true);

        return sessionRepository.save(updatedSession);
    }

    public List<SessionReturn> getSessionsWithinAWeekByWorkerId(String workerId) {
        List<Session> sessions = getSessionsByWorkerId(workerId);
        List<SessionReturn> returns = new ArrayList<>();
        if(sessions.isEmpty()) {
            throw new AdminDetailsException("No sessions found for worker ID " + workerId);
        }
        Date currentDate = new Date();
        Date lastDate = new Date(currentDate.getTime() + 7*(1000 * 60 * 60 * 24));

        Calendar cStart = Calendar.getInstance(); cStart.setTime(currentDate);
        Calendar cEnd = Calendar.getInstance(); cEnd.setTime(lastDate);

        while (cStart.before(cEnd)) {
            for(Session session : sessions) {
                if(Utility.convertDateToDay(cStart.getTime()) == session.getDay()) {
                    returns.add(new SessionReturn(cStart.getTime(), session.getStartTime(), session.getEndTime()));
                }
            }
            cStart.add(Calendar.DAY_OF_MONTH, 1);
        }
        if(returns.isEmpty()) {
            throw new AdminDetailsException("No sessions found for worker ID " + workerId);
        }
        return returns;
    }
}

