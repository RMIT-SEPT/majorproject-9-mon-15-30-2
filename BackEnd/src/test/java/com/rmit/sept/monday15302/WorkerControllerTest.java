package com.rmit.sept.monday15302;

import com.rmit.sept.monday15302.model.WorkerDetails;
import com.rmit.sept.monday15302.services.WorkerDetailsService;
import com.rmit.sept.monday15302.web.WorkerController;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(WorkerController.class)
public class WorkerControllerTest {
    @Autowired
    private MockMvc mvc;

    @MockBean
    private WorkerDetailsService service;

    @Test
    public void givenWorkers_whenGetAllWorkers_thenReturnJsonArray()
            throws Exception {

        WorkerDetails worker1 = new WorkerDetails();
        worker1.setId("w1");
        WorkerDetails worker2 = new WorkerDetails();
        worker2.setId("w2");

        List<WorkerDetails> workers = new ArrayList<>();
        workers.add(worker1);
        workers.add(worker2);

        given(service.getAllWorkers()).willReturn(workers);

        mvc.perform(get("/makebooking/allworkers")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(worker1.getId())))
                .andExpect(jsonPath("$[1].id", is(worker2.getId())));
    }

    @Test
    public void givenWorker_fetchOneWorkerById() throws Exception {

        WorkerDetails worker = new WorkerDetails();
        String id = "w1";
        worker.setId(id);

        given(service.getWorkerById(id)).willReturn(worker);

        mvc.perform(get("/worker/{id}", id)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(id)));
    }
}
