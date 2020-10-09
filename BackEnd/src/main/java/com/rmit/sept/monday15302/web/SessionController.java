package com.rmit.sept.monday15302.web;

import com.rmit.sept.monday15302.services.MapValidationErrorService;
import com.rmit.sept.monday15302.services.SessionService;
import com.rmit.sept.monday15302.services.WorkerDetailsService;
import com.rmit.sept.monday15302.utils.Request.SessionCreated;
import com.rmit.sept.monday15302.utils.Utility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class SessionController {

    @Autowired
    SessionService sessionService;

    @Autowired
    Utility utility;

    @Autowired
    WorkerDetailsService workerDetailsService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/createSession")
    public ResponseEntity<?> createNewSession(@Valid @RequestBody SessionCreated session,
                                             BindingResult result) throws ParseException {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;
        return new ResponseEntity<>(sessionService.saveSession(session), HttpStatus.CREATED);
    }

    @GetMapping("/sessions/{workerId}/{day}")
    public ResponseEntity<?> getSessionsByWorkerIdAndDay(@PathVariable("workerId") String workerId,
                                                    @PathVariable("day") int day) {
        return new ResponseEntity<>(sessionService.getSessionsByWorkerIdAndDay(workerId, day), HttpStatus.OK);
    }

    @GetMapping("/sessions/{adminId}")
    public ResponseEntity<?> getSessionsByAdminId(@PathVariable("adminId") String adminId) {
        if(utility.isCurrentLoggedInUser(adminId)) {
            return new ResponseEntity<>(sessionService.getSessionsByAdminId(adminId), HttpStatus.OK);
        }
        return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    @GetMapping("session/{sessionId}/{adminId}")
    public ResponseEntity<?> getSessionById(@PathVariable("sessionId") String sessionId,
                                            @PathVariable("adminId") String adminId) {
        if(utility.isCurrentLoggedInUser(adminId)) {
            return new ResponseEntity<>(sessionService.getSessionById(sessionId), HttpStatus.OK);
        }
        return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
    }

    @PutMapping("/editSession/{sessionId}")
    public ResponseEntity<?> updateSessions(@PathVariable("sessionId") String sessionId,
                                          @Valid @RequestBody SessionCreated session,
                                          BindingResult result) throws ParseException {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;
        return new ResponseEntity<>(sessionService.updateSession(session, sessionId), HttpStatus.OK);
    }

    @GetMapping("/availableSessions/{workerId}/{adminId}")
    public ResponseEntity<?> getSessionsWithinAWeekByWorkerId(@PathVariable("workerId") String workerId,
                                                   @PathVariable("adminId") String adminId) {
        workerDetailsService.getWorkerById(workerId, adminId);
        if(utility.isCurrentLoggedInUser(adminId)) {
            return new ResponseEntity<>(sessionService.getSessionsWithinAWeekByWorkerId(workerId), HttpStatus.OK);
        }
        return new ResponseEntity<>("Unauthorized", HttpStatus.UNAUTHORIZED);
    }
}
