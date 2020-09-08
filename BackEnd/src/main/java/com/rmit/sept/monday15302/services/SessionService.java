package com.rmit.sept.monday15302.services;

import com.rmit.sept.monday15302.Repositories.SessionRepository;
import com.rmit.sept.monday15302.exception.BookingException;
import com.rmit.sept.monday15302.model.Booking;
import com.rmit.sept.monday15302.model.Session;
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

    public List<SessionReturn> getAvailableSession(String workerId, String service)
            throws ParseException {
        List<Session> sessions = sessionRepository.getSessionByWorkerAndService(workerId, service);
        List<SessionReturn> toReturn = new ArrayList<>();

        // Get current date
        Calendar cal = Calendar.getInstance(TimeZone.getTimeZone("Australia/Sydney"));
        cal.setTime(new Date());
        int year = cal.get(Calendar.YEAR);
        int month = cal.get(Calendar.MONTH);
        int day = cal.get(Calendar.DAY_OF_MONTH);

        // Loop from current date to the end of the month and convert session from day to date
        int numDays = Utility.getWorkingDaysInMonth(month, year);

        for(int index = (day+1); index <= numDays; index++) {
            // Check with the day in sessions
            Date date = Date.from(LocalDate.of(year, month, index)
                    .atStartOfDay(ZoneId.systemDefault()).toInstant());
            int currentDay = Utility.convertDateToDay(date);
            for(Session session : sessions) {
                if(session.getDay() == currentDay) {
                    toReturn.add(new SessionReturn(Utility.getDateAsString(date),
                            Utility.getTimeAsString(session.getStartTime()),
                            Utility.getTimeAsString(session.getEndTime())));
                }
            }
        }

        List<Integer> indexes = new ArrayList<>();

        // Filter list of sessions by worker's current bookings
        for(int i = 0; i != toReturn.size(); i++) {
            SessionReturn s = toReturn.get(i);
            List<Booking> bookings = bookingService.getUnavailableSessions(workerId,
                    Utility.getDateAsString(s.getDate()));
            if(!bookings.isEmpty()) {
                for(Booking booking : bookings) {
                    if(booking.getStartTime().equals(s.getStartTime())
                        && booking.getEndTime().equals(s.getEndTime())) {
                        indexes.add(i);
                    }
                }
            }
        }

        if(!indexes.isEmpty()) {
            for(int x = indexes.size() - 1; x >= 0; x--) {
                toReturn.remove(indexes.get(x));
            }
        }

        if(toReturn.isEmpty()) {
            throw new BookingException("Worker id " + workerId + " has no available sessions");
        }

        return toReturn;
    }
}
