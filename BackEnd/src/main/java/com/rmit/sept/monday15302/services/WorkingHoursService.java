package com.rmit.sept.monday15302.services;

import com.rmit.sept.monday15302.Repositories.WorkingHoursRepository;
import com.rmit.sept.monday15302.exception.WorkingHoursException;
import com.rmit.sept.monday15302.model.WorkingHours;
import com.rmit.sept.monday15302.utils.Utility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class WorkingHoursService {
    @Autowired
    private WorkingHoursRepository workingHoursRepository;

    public List<Date> getOpeningHours(String adminId, String date) throws ParseException {

        // Convert date to day
        Date converted = Utility.convertStringToDate(date);
        int day = Utility.convertDateToDay(converted);

        WorkingHours toReturn;

        if(day > 0 && day < 8) {
            // Get working hours of worker by day and admin where he/she works for
            toReturn = workingHoursRepository.findByAdmin_idAndDay(adminId, day);
        } else {
            throw new WorkingHoursException("Cannot convert date " + date + " to day");
        }

        if(toReturn == null) {
            throw new WorkingHoursException("No working hours found for admin with id "
                    + adminId + " on day " + day);
        }

        List<Date> sessionsList = new ArrayList<>();
        sessionsList.add(toReturn.getStartTime());
        sessionsList.add(toReturn.getEndTime());

        return sessionsList;
    }
}
