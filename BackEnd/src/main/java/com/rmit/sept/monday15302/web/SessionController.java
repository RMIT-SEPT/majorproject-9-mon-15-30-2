package com.rmit.sept.monday15302.web;

import com.rmit.sept.monday15302.services.MapValidationErrorService;
import com.rmit.sept.monday15302.services.SessionService;
import com.rmit.sept.monday15302.utils.Request.SessionCreated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.text.ParseException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SessionController {

    @Autowired
    SessionService sessionService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @PostMapping("/createSession")
    public ResponseEntity<?> createNewSession(@Valid @RequestBody SessionCreated session,
                                             BindingResult result) throws ParseException {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;
        return new ResponseEntity<>(sessionService.saveSession(session), HttpStatus.CREATED);
    }

    @GetMapping("/sessions/{adminId}")
    public ResponseEntity<?> getSessionsByAdminId(@PathVariable("adminId") String adminId) {
        return new ResponseEntity<>(sessionService.getSessionsByAdminId(adminId), HttpStatus.OK);
    }
}
