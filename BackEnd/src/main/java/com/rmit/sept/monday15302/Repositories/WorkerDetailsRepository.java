package com.rmit.sept.monday15302.Repositories;

import com.rmit.sept.monday15302.model.WorkerDetails;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface WorkerDetailsRepository extends CrudRepository<WorkerDetails, String> {

    Collection<WorkerDetails> findByAdminId(String adminId);

    @Query("select DISTINCT worker.admin.id from WorkerDetails worker where worker.id = :id")
    String getAdminIdByWorkerId(@Param("id") String id);

    @Override
    List<WorkerDetails> findAll();
    
    @Query("select worker from WorkerDetails worker where worker.admin.id = :adminId")
    List<WorkerDetails> getWorkersByAdmin(String adminId);

    @Query("select worker from WorkerDetails worker where worker.user.id = :id")
    WorkerDetails getWorkerById(String id);
}
