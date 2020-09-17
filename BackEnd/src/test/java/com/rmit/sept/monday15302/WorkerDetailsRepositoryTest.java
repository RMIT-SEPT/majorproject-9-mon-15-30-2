package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.Repositories.WorkerDetailsRepository;
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

import java.util.List;

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
    public void findAllWorkers_returnWorkers_ifWorkersFound() {
        assert(!workerDetailsRepository.findAll().isEmpty());
    }

    @Test
    public void findByWorkerId_returnWorkerDetails_ifWorkerFound() {
        assert(workerDetailsRepository.getWorkerById(workerId).equals(worker));
    }

    @Test
    public void findByWorkerId_returnNull_ifWorkerNotFound() {
        assert(workerDetailsRepository.getWorkerById("1") == null);
    }

    @Test
    public void getWorkersByAdminId_returnWorkerDetails_ifWorkersFound() {
        List<WorkerDetails> workers = workerDetailsRepository.getWorkersByAdminId(adminId);
        assert(workers.size() == 2 && workers.contains(worker) && workers.contains(worker1));
    }

    @Test
    public void getWorkersByAdminId_returnNull_ifNoWorkersFound() {
        assert(workerDetailsRepository.getWorkersByAdminId("adminadmin").isEmpty());
    }
}
