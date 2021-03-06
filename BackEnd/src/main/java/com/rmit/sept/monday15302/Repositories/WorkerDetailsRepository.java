package com.rmit.sept.monday15302.Repositories;

import com.rmit.sept.monday15302.model.WorkerDetails;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WorkerDetailsRepository extends CrudRepository<WorkerDetails, String> {
    
    List<WorkerDetails> findByAdminId(String adminId);

    @Query("select worker from WorkerDetails worker where worker.user.id = :id " +
            "and worker.admin.id = :adminId")
    WorkerDetails getByIdAndAdminId(String id, String adminId);

    @Query("select worker from WorkerDetails worker where worker.user.id = :workerId")
    WorkerDetails getWorkerById(String workerId);
}
