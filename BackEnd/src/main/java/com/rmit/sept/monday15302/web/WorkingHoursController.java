package com.rmit.sept.monday15302.web;

import com.rmit.sept.monday15302.services.WorkingHoursService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WorkingHoursController {
    @Autowired
    WorkingHoursService workingHoursService;

    @GetMapping("/openinghours/{adminId}/{day}")
    public ResponseEntity<?> getOpeningHours(@PathVariable("adminId") String adminId,
                                             @PathVariable("day") int day) {
        return new ResponseEntity<>(workingHoursService.getOpeningHoursByDayAndAdmin(day, adminId),
                HttpStatus.OK);
    }

}
