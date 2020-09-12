package com.rmit.sept.monday15302.services;

import com.rmit.sept.monday15302.Repositories.WorkerDetailsRepository;
import com.rmit.sept.monday15302.exception.BookingException;
import com.rmit.sept.monday15302.exception.WorkerDetailsException;
import com.rmit.sept.monday15302.model.User;
import com.rmit.sept.monday15302.model.WorkerDetails;
import com.rmit.sept.monday15302.utils.Request.EditWorker;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WorkerDetailsService {
    @Autowired
    private WorkerDetailsRepository workerDetailsRepository;

    @Autowired
    private UserService userService;

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

    public WorkerDetails saveWorker(WorkerDetails worker, String username) {
        try {
            return workerDetailsRepository.save(worker);
        } catch (Exception e) {
            // delete the created user
            userService.deleteByUsername(username);
            throw new WorkerDetailsException("Cannot create a worker");
        }
    }

    public void deleteWorker(String username) {
        WorkerDetails worker = workerDetailsRepository.getWorkerByUsername(username);
        if(worker == null){
            throw new WorkerDetailsException("Cannot delete worker with username '"+username+"'. "
                    + "This worker does not exist");
        }
        workerDetailsRepository.delete(worker);
    }

    public WorkerDetails updateWorker(EditWorker worker, String username) {
        String newUsername = worker.getUsername();
        WorkerDetails workerDetails = workerDetailsRepository.getWorkerByUsername(username);
        User user = userService.getUser(username);
        if(workerDetails == null || user == null) {
            throw new WorkerDetailsException("Worker with username '"+username+"' not found");
        }
        user.setUserName(newUsername);
        user.setPassword(worker.getPassword());
        userService.saveUser(user);

        workerDetails.setfName(worker.getfName());
        workerDetails.setlName(worker.getlName());
        workerDetails.setPhoneNumber(worker.getPhoneNumber());
        workerDetails.setUser(user);

        return workerDetailsRepository.save(workerDetails);
    }

    public List<WorkerDetails> getWorkersByAdmin(String adminId) {
        List<WorkerDetails> toReturn = workerDetailsRepository.getWorkersByAdmin(adminId);
        if(toReturn.isEmpty()) {
            throw new WorkerDetailsException("Admin with id '"+adminId+"' has no employees");
        }
        return toReturn;
    }
}
