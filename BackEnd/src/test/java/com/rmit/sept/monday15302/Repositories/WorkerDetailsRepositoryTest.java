package com.rmit.sept.monday15302.Repositories;

import com.rmit.sept.monday15302.model.AdminDetails;
import com.rmit.sept.monday15302.model.User;
import com.rmit.sept.monday15302.model.UserType;
import com.rmit.sept.monday15302.model.WorkerDetails;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Collection;

@DataJpaTest
@RunWith(SpringRunner.class)
public class WorkerDetailsRepositoryTest {

    private static String workerId;
    private static WorkerDetails worker;
    private static String adminId;
    private static WorkerDetails worker1;

    @Autowired
    TestEntityManager entityManager;

    @Autowired
    private WorkerDetailsRepository workerDetailsRepository;

    @Before
    public void setup() {
        User user = new User("admin", "*", UserType.ADMIN);
        User user2 = new User("worker", "*", UserType.WORKER);
        User user3 = new User("worker1", "*", UserType.WORKER);
        entityManager.persist(user);
        entityManager.persist(user2);
        entityManager.persist(user3);

        AdminDetails admin = new AdminDetails("Melbourne Salon", "Haircut", user);
        entityManager.persist(admin);

        worker = new WorkerDetails(user2, "John", "Smith", admin, "0123445556");
        entityManager.persist(worker);

        worker1 = new WorkerDetails(user3, "Michael", "Smith", admin, "0123445556");
        entityManager.persist(worker1);
        entityManager.flush();

        workerId = worker.getId();
        adminId = admin.getId();
    }

    @Test
    public void findAllWorkers_returnTrue_ifWorkersFound() {
        assert(!workerDetailsRepository.findAll().isEmpty());
    }

    @Test
    public void findByWorkerId_returnTrue_ifWorkerFound() {
        assert(workerDetailsRepository.findByWorkerId(workerId).equals(worker));
    }

    @Test
    public void findByWorkerId_returnTrue_ifWorkerNotFound() {
        assert(workerDetailsRepository.findByWorkerId("1") == null);
    }

    @Test
    public void getAdminIdByWorkerId_returnTrue_ifAdminIdFound() {
        assert(workerDetailsRepository.getAdminIdByWorkerId(workerId).equals(adminId));
    }

    @Test
    public void getAdminIdByWorkerId_returnTrue_ifAdminIdNotFound() {
        assert(workerDetailsRepository.getAdminIdByWorkerId("1") == null);
    }

    @Test
    public void findByAdminId_returnTrue_ifWorkersFound() {
        Collection<WorkerDetails> workersList = workerDetailsRepository.findByAdminId(adminId);
        boolean correct = workersList.size() == 2 && workersList.contains(worker)
                && workersList.contains(worker1);
        assert(correct);
    }

    @Test
    public void findByAdminId_returnTrue_ifNoWorkersFound() {
        assert(workerDetailsRepository.findByAdminId("1").isEmpty());
    }
}
