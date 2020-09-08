package com.rmit.sept.monday15302.services;

import com.rmit.sept.monday15302.Repositories.WorkerDetailsRepository;
import com.rmit.sept.monday15302.exception.WorkerDetailsException;
import com.rmit.sept.monday15302.model.AdminDetails;
import com.rmit.sept.monday15302.model.WorkerDetails;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.ArrayList;
import java.util.List;

@RunWith(SpringRunner.class)
@SpringBootTest
public class WorkerDetailsServiceTest {
    @Autowired
    private WorkerDetailsService workerDetailsService;

    @MockBean
    private WorkerDetailsRepository workerDetailsRepository;

    @Before
    public void setup() {

        WorkerDetails worker1 = new WorkerDetails();
        worker1.setId("w1");
        WorkerDetails worker2 = new WorkerDetails();
        worker2.setId("w2");

        List<WorkerDetails> workerList = new ArrayList<>();
        workerList.add(worker1);
        workerList.add(worker2);

        Mockito.when(workerDetailsRepository.findAll())
                .thenReturn(workerList);

        AdminDetails admin1 = new AdminDetails();
        admin1.setId("a1");

        worker1.setAdmin(admin1);
        worker2.setAdmin(admin1);

        Mockito.when(workerDetailsRepository.findByAdminId(admin1.getId()))
                .thenReturn(workerList);

        Mockito.when(workerDetailsRepository.getAdminIdByWorkerId(worker1.getId()))
                .thenReturn(admin1.getId());

        Mockito.when(workerDetailsRepository.findByWorkerId(worker1.getId())).thenReturn(worker1);
    }

    @Test
    public void getAllWorkers_returnTrue_ifWorkersFound() {
        String id1 = "w1";
        String id2 = "w2";
        List<WorkerDetails> list = workerDetailsService.getAllWorkers();
        assert(list.size() == 2 && list.get(0).getId().equals(id1)
                    && list.get(1).getId().equals(id2));
    }

    @Test
    public void getWorkerByAdmin_returnTrue_IfWorkersFound() {
        List<String> adminId = new ArrayList<>();
        adminId.add("a1");
        String worker1Id = "w1";
        String worker2Id = "w2";
        List<WorkerDetails> workerList = workerDetailsService.getWorkerForAdmin(adminId);
        assert(workerList.size() == 2 && workerList.get(0).getId().equals(worker1Id)
            && workerList.get(1).getId().equals(worker2Id));
    }

    @Test(expected = WorkerDetailsException.class)
    public void getWorkerByAdmin_throwException_IfNoWorkersFound() throws WorkerDetailsException {
        List<String> adminIdList = new ArrayList<>();
        adminIdList.add("a3");
        adminIdList.add("a4");
        workerDetailsService.getWorkerForAdmin(adminIdList);
    }

    @Test
    public void getAdminIdByWorkerId_returnTrue_ifAdminFound() {
        String adminId = "a1";
        String workerId = "w1";
        assert(workerDetailsService.getAdminIdByWorkerId(workerId).equals(adminId));
    }

    @Test(expected = WorkerDetailsException.class)
    public void getAdminIdByWorkerId_throwException_ifAdminNotFound() throws WorkerDetailsException {
        String adminId = "a4";
        workerDetailsService.getAdminIdByWorkerId(adminId);
    }

    @Test
    public void getWorkerById_returnTrue_ifWorkerFound() {
        String id1 = "w1";
        WorkerDetails toCheck = workerDetailsService.getWorkerById(id1);
        assert(toCheck != null);
    }

    @Test(expected = WorkerDetailsException.class)
    public void getWorkerById_throwException_ifWorkerNotFound() throws WorkerDetailsException {
        assert(workerDetailsService.getWorkerById("1234") == null);
    }

}
