package com.rmit.sept.monday15302.services;

import com.rmit.sept.monday15302.Repositories.WorkingHoursRepository;
import com.rmit.sept.monday15302.model.WorkingHours;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class WorkingHoursService {
    @Autowired
    private WorkingHoursRepository workingHoursRepository;

    public WorkingHours getOpeningHoursByDayAndAdmin(int day, String adminId) {
        return workingHoursRepository.findByAdmin_idAndDay(adminId, day);
    }

    public boolean isNotifiedDate(String adminId) {
        Date today = new Date();
        List<WorkingHours> workingHoursList = workingHoursRepository.findByAdmin_id(adminId);
        if (workingHoursList.isEmpty()) {
            return false;
        } else {
            Date notifiedDate = workingHoursList.get(0).getDate();
            return today.getTime() >= notifiedDate.getTime();
        }
    }

    public void resetNotifiedDate(String adminId) {
        Date today = new Date();
        Date reset = new Date(today.getTime() +  (long) 30 * 1000L * 60 * 60 * 24);
        List<WorkingHours> workingHoursList = workingHoursRepository.findByAdmin_id(adminId);
        if (!workingHoursList.isEmpty()) {
            for(WorkingHours workingHours : workingHoursList) {
                workingHours.setDateByDate(reset);
                workingHoursRepository.save(workingHours);
            }
        }
    }
}
