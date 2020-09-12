package com.rmit.sept.monday15302.web;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.sept.monday15302.exception.UserException;
import com.rmit.sept.monday15302.model.AdminDetails;
import com.rmit.sept.monday15302.model.User;
import com.rmit.sept.monday15302.model.UserType;
import com.rmit.sept.monday15302.model.WorkerDetails;
import com.rmit.sept.monday15302.services.AdminDetailsService;
import com.rmit.sept.monday15302.services.MapValidationErrorService;
import com.rmit.sept.monday15302.services.UserService;
import com.rmit.sept.monday15302.services.WorkerDetailsService;
import com.rmit.sept.monday15302.utils.Request.EditWorker;
import com.rmit.sept.monday15302.utils.Request.WorkerSignup;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class WorkerController {
    @Autowired
    WorkerDetailsService workerDetailsService;

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    UserService userService;

    @Autowired
    AdminDetailsService adminDetailsService;

    @GetMapping(value="/worker/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getWorkerById(@PathVariable("id") String id) {
        return new ResponseEntity<>(workerDetailsService.getWorkerById(id), HttpStatus.OK);
    }

    @GetMapping("makebooking/allworkers")
    public ResponseEntity<?> getAllWorkers() {
        return new ResponseEntity<>(workerDetailsService.getAllWorkers(),
                HttpStatus.OK);
    }

    @GetMapping(value="workerbyfName/{fName}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getWorkerByFirstName(@PathVariable("fName") String fName) {
        return new ResponseEntity<>(workerDetailsService.getWorkerByFirstName(fName),
                HttpStatus.OK);
    }

    @PostMapping("/createWorker")
    public ResponseEntity<?> createNewWorker(@Valid @RequestBody WorkerSignup signupWorker,
                             BindingResult result) {

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        String username = signupWorker.getUsername();
        if (userService.existsByUsername(username)) {
            throw new UserException("Error: Username is already taken!");
        }

        AdminDetails admin = adminDetailsService.getAdminById(signupWorker.getAdminId());

        // Create new user and new worker
        User user = new User(username, signupWorker.getPassword(), UserType.WORKER);
        WorkerDetails worker = new WorkerDetails(user, signupWorker.getfName(),
                signupWorker.getlName(), admin, signupWorker.getPhoneNumber());
        userService.saveUser(user);
        WorkerDetails newWorker = workerDetailsService.saveWorker(worker, username);
        return new ResponseEntity<>(newWorker, HttpStatus.CREATED);
    }

    @DeleteMapping("/deleteWorker/{username}")
    public ResponseEntity<?> deleteWorker(@PathVariable("username") String username) {
        workerDetailsService.deleteWorker(username);
        userService.deleteByUsername(username);
        return new ResponseEntity<>("Deleted worker with username " + username, HttpStatus.OK);
    }

    @PutMapping("/editWorker/{username}")
    public ResponseEntity<?> updateWorker(@PathVariable("username") String username,
                              @Valid @RequestBody EditWorker worker,
                              BindingResult result) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        String jsonString = objectMapper.writeValueAsString(worker);
        System.out.println(jsonString);
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;
        WorkerDetails updatedWorker = workerDetailsService.updateWorker(worker, username);
        return new ResponseEntity<>(updatedWorker, HttpStatus.OK);
    }

    @GetMapping("/workers/{adminId}")
    public ResponseEntity<?> getWorkersByAdmin(@PathVariable("adminId") String adminId) {
        return new ResponseEntity<>(workerDetailsService.getWorkersByAdmin(adminId), HttpStatus.OK);
    }
}
