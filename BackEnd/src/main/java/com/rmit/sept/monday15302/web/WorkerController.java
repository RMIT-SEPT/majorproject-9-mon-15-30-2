package com.rmit.sept.monday15302.web;

import com.rmit.sept.monday15302.model.WorkerDetails;
import com.rmit.sept.monday15302.services.WorkerDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WorkerController {
    @Autowired
    WorkerDetailsService workerDetailsService;

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
        return new ResponseEntity<WorkerDetails>(workerDetailsService.getWorkerByFirstName(fName), HttpStatus.OK);
    }
}
