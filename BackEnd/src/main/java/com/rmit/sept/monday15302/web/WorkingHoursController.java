package com.rmit.sept.monday15302.web;

import com.rmit.sept.monday15302.services.WorkingHoursService;
import com.rmit.sept.monday15302.utils.Utility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class WorkingHoursController {

    @Autowired
    WorkingHoursService workingHoursService;

    @Autowired
    Utility utility;

    @GetMapping("/admin/openinghours/{adminId}/{day}")
    public ResponseEntity<?> getOpeningHoursByAdminIdAndDay(@PathVariable("adminId") String adminId,
                                                            @PathVariable("day") int day) {
        return new ResponseEntity<>(workingHoursService.getOpeningHoursByDayAndAdmin(day, adminId),
                HttpStatus.OK);
    }

    @GetMapping("/admin/checkNotifiedDate/{adminId}")
    public ResponseEntity<?> isNotifiedDate(@PathVariable("adminId") String adminId) {
        if(utility.isCurrentLoggedInUser(adminId)) {
            return new ResponseEntity<>(workingHoursService.isNotifiedDate(adminId), HttpStatus.OK);
        }
        return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

}
