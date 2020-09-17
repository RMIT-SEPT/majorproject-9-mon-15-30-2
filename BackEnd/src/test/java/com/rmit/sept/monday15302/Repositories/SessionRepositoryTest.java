package com.rmit.sept.monday15302.Repositories;

import com.rmit.sept.monday15302.model.*;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.text.ParseException;
import java.util.List;

@DataJpaTest
@RunWith(SpringRunner.class)
public class SessionRepositoryTest {
    private static String workerId;
    private static String service = "Haircut";
    private static WorkerDetails worker;
    private static Session session;

    @Autowired
    TestEntityManager entityManager;

    @Autowired
    private SessionRepository sessionRepository;

    @Before
    public void setup() throws ParseException {
        User user2 = new User("admin", "*", UserType.ADMIN);
        User user3 = new User("worker", "*", UserType.WORKER);
        entityManager.persist(user2);
        entityManager.persist(user3);

        AdminDetails admin = new AdminDetails("Melbourne Salon", "Haircut", user2);
        entityManager.persist(admin);

        worker = new WorkerDetails(user2, "John", "Smith", admin, "0123445556");
        entityManager.persist(worker);

        session = new Session(worker, 2, "08:00:00", "09:00:00", service);
        entityManager.persist(session);
        entityManager.flush();

        workerId = worker.getId();
    }

    @Test
    public void findByWorkerId_returnTrue_ifSessionFound() {
        List<Session> sessions = sessionRepository.getSessionByWorkerAndService(workerId, service);
        assert(!sessions.isEmpty() && sessions.contains(session));
    }

    @Test
    public void findByWorkerId_returnTrue_ifNoSessionFound() {
        List<Session> sessions = sessionRepository.getSessionByWorkerAndService(workerId, "Salon");
        assert(sessions.isEmpty());
    }
}
