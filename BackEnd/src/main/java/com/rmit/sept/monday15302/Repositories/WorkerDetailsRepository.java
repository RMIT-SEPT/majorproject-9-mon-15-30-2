package com.rmit.sept.monday15302.Repositories;

import com.rmit.sept.monday15302.model.WorkerDetails;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;

@Repository
public interface WorkerDetailsRepository extends CrudRepository<WorkerDetails, String> {

    Collection<WorkerDetails> findByAdminId(String adminId);

    @Query("select DISTINCT worker.admin.id from WorkerDetails worker where worker.id = :id")
    String getAdminIdFromWorkerId(@Param("id") String id);
}
