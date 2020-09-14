package com.rmit.sept.monday15302.services;

import com.rmit.sept.monday15302.Repositories.WorkingHoursRepository;
import com.rmit.sept.monday15302.model.WorkingHours;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkingHoursService {
    @Autowired
    private WorkingHoursRepository workingHoursRepository;

    public WorkingHours getOpeningHoursByDayAndAdmin(int day, String adminId) {
        return workingHoursRepository.findByAdmin_idAndDay(adminId, day);
    }
}
