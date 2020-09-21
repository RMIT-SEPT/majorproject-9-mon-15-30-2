package com.rmit.sept.monday15302.Repositories;

import com.rmit.sept.monday15302.model.Session;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SessionRepository extends CrudRepository<Session, String> {
    List<Session> findByWorkerIdAndService(String workerId, String service);

    List<Session> findByWorkerIdAndDay(String id, int day);

}
