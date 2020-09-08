package com.rmit.sept.monday15302.Repositories;

import com.rmit.sept.monday15302.model.Session;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessionRepository extends CrudRepository<Session, String> {
    @Query("select session from Session session where session.worker.id = :workerId and session.service = :service")
    List<Session> getSessionByWorkerAndService(String workerId, String service);
}
