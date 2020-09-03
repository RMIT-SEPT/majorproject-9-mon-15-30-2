package com.rmit.sept.monday15302.services;

import com.rmit.sept.monday15302.Repositories.WorkerDetailsRepository;
import com.rmit.sept.monday15302.exception.BookingException;
import com.rmit.sept.monday15302.model.WorkerDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WorkerDetailsService {
    @Autowired
    private WorkerDetailsRepository workerDetailsRepository;

    public WorkerDetails getWorkerById(String id) {
        WorkerDetails worker = workerDetailsRepository.findByWorkerId(id);
        if(worker == null) {
            throw new BookingException("Worker not found");
        }
        return worker;
    }
}
