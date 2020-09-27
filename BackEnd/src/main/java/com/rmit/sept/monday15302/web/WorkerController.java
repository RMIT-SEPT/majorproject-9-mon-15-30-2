package com.rmit.sept.monday15302.web;

import com.rmit.sept.monday15302.exception.UserException;
import com.rmit.sept.monday15302.exception.WorkerDetailsException;
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

    @GetMapping(value="/admin/worker/{id}/{adminId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getWorkerById(@PathVariable("id") String id,
                                           @PathVariable("adminId") String adminId) {
        return new ResponseEntity<>(workerDetailsService.getWorkerById(id, adminId), HttpStatus.OK);
    }

    @PostMapping("/admin/createWorker")
    public ResponseEntity<?> createNewWorker(@Valid @RequestBody WorkerSignup signupWorker,
                             BindingResult result) {

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) throw new WorkerDetailsException(errorMap.toString());

        String username = signupWorker.getUsername();
        if (userService.existsByUsername(username)) {
            throw new UserException("Error: Username is already taken!");
        }

        AdminDetails admin = adminDetailsService.getAdminById(signupWorker.getAdminId());

        // Create new user and new worker
        User user = new User(username, signupWorker.getPassword(), UserType.ROLE_WORKER);
        WorkerDetails worker = new WorkerDetails(user, signupWorker.getfName(),
                signupWorker.getlName(), admin, signupWorker.getPhoneNumber());
        userService.saveUser(user);
        WorkerDetails newWorker = workerDetailsService.saveWorker(worker, username);
        return new ResponseEntity<>(newWorker, HttpStatus.CREATED);
    }

    @DeleteMapping("/admin/deleteWorker/{id}/{adminId}")
    public ResponseEntity<?> deleteWorker(@PathVariable("id") String id,
                                          @PathVariable("adminId") String adminId) {
        workerDetailsService.deleteWorker(id, adminId);
        userService.deleteById(id);
        return new ResponseEntity<>("Deleted worker with id " + id, HttpStatus.OK);
    }

    @PutMapping("/admin/editWorker/{id}/{adminId}")
    public ResponseEntity<?> updateWorker(@PathVariable("id") String id,
                  @PathVariable("adminId") String adminId, @Valid @RequestBody EditWorker worker,
                  BindingResult result) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;
        EditWorker updatedWorker = workerDetailsService.updateWorker(worker, id, adminId);
        return new ResponseEntity<>(updatedWorker, HttpStatus.OK);
    }

    @GetMapping("/admin/workers/{adminId}")
    public ResponseEntity<?> getWorkersByAdmin(@PathVariable("adminId") String adminId) {
        return new ResponseEntity<>(workerDetailsService.getWorkersByAdminId(adminId), HttpStatus.OK);
    }
}
