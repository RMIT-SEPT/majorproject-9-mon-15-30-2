package com.rmit.sept.monday15302.services;

import com.rmit.sept.monday15302.Repositories.WorkerDetailsRepository;
import com.rmit.sept.monday15302.exception.WorkerDetailsException;
import com.rmit.sept.monday15302.exception.BookingException;
import com.rmit.sept.monday15302.exception.WorkerDetailsException;
import com.rmit.sept.monday15302.model.WorkerDetails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WorkerDetailsService {
    @Autowired
    private WorkerDetailsRepository workerDetailsRepository;

    public WorkerDetails getWorkerById(String id) {
        WorkerDetails worker = workerDetailsRepository.findByWorkerId(id);
        if(worker == null) {
            throw new WorkerDetailsException("Worker with id " + id + " not found");
        }
        return worker;
    }

    public List<WorkerDetails> getWorkerForAdmin(List<String> adminList) {
        List<WorkerDetails> workersList = new ArrayList<>();
        for (String adminId : adminList) {
            workersList.addAll(workerDetailsRepository.findByAdminId(adminId));
        }

        if(workersList.size() == 0) {
            throw new WorkerDetailsException("No workers found for list of admins");
        }

        return workersList;
    }

    public List<WorkerDetails> getAllWorkers() {
        return workerDetailsRepository.findAll();
    }

    public String getAdminIdByWorkerId(String workerId) {
        String adminId = workerDetailsRepository.getAdminIdByWorkerId(workerId);
        if(adminId == null) {
            throw new WorkerDetailsException("Admin for worker " + workerId + " not found");
        }
        return adminId;
    }

    public WorkerDetails getWorkerByFirstName(String workerFirstName){
        WorkerDetails worker = workerDetailsRepository.findByWorkerFirstName(workerFirstName);
        if (worker == null){
            throw new BookingException("Worker not found in getWorkerByFirstName method");
        }
        return worker;
    }
}
