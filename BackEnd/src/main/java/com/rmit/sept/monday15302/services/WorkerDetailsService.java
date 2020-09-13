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

    public EditWorker getWorkerById(String id) {
        WorkerDetails worker = workerDetailsRepository.findByWorkerId(id);
        if(worker == null) {
            throw new WorkerDetailsException("Worker with id " + id + " not found");
        }
        User user = userService.getUserById(id);
        return new EditWorker(user.getUserName(), user.getPassword(), worker.getfName(),
                worker.getlName(), worker.getPhoneNumber());
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

    public void deleteWorker(String id) {
        WorkerDetails worker = workerDetailsRepository.getWorkerById(id);
        if(worker == null){
            throw new WorkerDetailsException("Cannot delete worker with id '"+id+"'. "
                    + "This worker does not exist");
        }
        workerDetailsRepository.delete(worker);
    }

    public EditWorker updateWorker(EditWorker worker, String id) {
        WorkerDetails workerDetails = workerDetailsRepository.getWorkerById(id);
        User user = userService.getUserById(id);
        if(workerDetails == null || user == null) {
            throw new WorkerDetailsException("Worker with id '"+id+"' not found");
        }
        user.setUserName(worker.getUsername());
        user.setPassword(worker.getPassword());
        User updatedUser = userService.saveUser(user);

        workerDetails.setfName(worker.getfName());
        workerDetails.setlName(worker.getlName());
        workerDetails.setPhoneNumber(worker.getPhoneNumber());
        workerDetails.setUser(user);

        WorkerDetails updatedWorker = workerDetailsRepository.save(workerDetails);
        return new EditWorker(updatedUser.getUserName(), updatedUser.getPassword(), updatedWorker.getfName(),
                updatedWorker.getlName(), updatedWorker.getPhoneNumber());
    }

    public List<EditWorker> getWorkersByAdmin(String adminId) {
        List<WorkerDetails> toReturn = workerDetailsRepository.getWorkersByAdmin(adminId);
        List<EditWorker> workers = new ArrayList<>();
        if(toReturn.isEmpty()) {
            throw new WorkerDetailsException("Admin with id '"+adminId+"' has no employees");
        }
        for(WorkerDetails worker : toReturn) {
            User user = userService.getUserById(worker.getId());
            EditWorker newWorker = new EditWorker(user.getUserName(), user.getPassword(), worker.getfName(),
                    worker.getlName(), worker.getPhoneNumber());
            workers.add(newWorker);
        }
        return workers;
    }
}
