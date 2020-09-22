package com.rmit.sept.monday15302;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.sept.monday15302.model.AdminDetails;
import com.rmit.sept.monday15302.model.User;
import com.rmit.sept.monday15302.model.UserType;
import com.rmit.sept.monday15302.model.WorkerDetails;
import com.rmit.sept.monday15302.services.AdminDetailsService;
import com.rmit.sept.monday15302.services.MapValidationErrorService;
import com.rmit.sept.monday15302.services.UserService;
import com.rmit.sept.monday15302.services.WorkerDetailsService;
import com.rmit.sept.monday15302.utils.Request.EditWorker;
import com.rmit.sept.monday15302.utils.Request.WorkerSignup;
import com.rmit.sept.monday15302.web.WorkerController;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest(WorkerController.class)
public class WorkerControllerTest {
    @Autowired
    private MockMvc mvc;

    @MockBean
    private WorkerDetailsService service;

    @MockBean
    private MapValidationErrorService mapValidationErrorService;

    @MockBean
    private UserService userService;

    @MockBean
    private AdminDetailsService adminDetailsService;

    private ObjectMapper objectMapper = new ObjectMapper();

    @Test
    public void givenWorker_fetchOneWorkerById() throws Exception {

        EditWorker worker = new EditWorker();
        String id = "w1";
        worker.setId(id);

        given(service.getWorkerById(id)).willReturn(worker);

        mvc.perform(get("/worker/{id}", id)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(id)));
    }

    @Test
    public void saveWorker_itShouldReturnStatusCreated() throws Exception {
        User user = new User("admin", "*", UserType.ADMIN);
        String id = "a1";
        user.setId(id);
        AdminDetails admin = new AdminDetails("Haircut", "Business", user);
        admin.setId(id);

        User newUser = new User("worker", "**", UserType.WORKER);
        WorkerDetails worker = new WorkerDetails(newUser,
                "John", "Smith", admin, "0412345678");

        given(userService.saveUser(Mockito.any(User.class))).willReturn(newUser);
        given(service.saveWorker(Mockito.any(WorkerDetails.class), eq(newUser.getUserName())))
                .willReturn(worker);

        WorkerSignup workerSignup = new WorkerSignup("worker", "**",
                "John", "Smith", id, "0412345678");

        String jsonString = objectMapper.writeValueAsString(workerSignup);

        mvc.perform(post("/createWorker")
                .content(jsonString)
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(content().contentType("application/json"));
    }

    @Test
    public void saveWorker_throwException_ifUserNameExists() throws Exception {
        User user = new User("admin", "*", UserType.ADMIN);
        String id = "a1";
        AdminDetails admin = new AdminDetails("Haircut", "Business", user);
        admin.setId(id);

        WorkerSignup workerSignup = new WorkerSignup("worker", "**",
                "John", "Smith", id, "0412345678");

        String jsonString = objectMapper.writeValueAsString(workerSignup);

        given(userService.existsByUsername(eq("worker"))).willReturn(true);

        mvc.perform(post("/createWorker")
                .content(jsonString)
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testDeleteWorker_itShouldReturnStatusOk() throws Exception {
        mvc.perform(delete("/deleteWorker/{id}", "11")
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void testEditEmployeeDetails_itShouldReturnStatusOk() throws Exception {
        String id = "123";
        EditWorker worker = new EditWorker(id, "worker",
                "**", "John", "Smith", "0412345678");

        given(service.updateWorker(Mockito.any(EditWorker.class), eq(id)))
                .willReturn(worker);

        String jsonString = objectMapper.writeValueAsString(worker);

        mvc.perform(put("/editWorker/{id}", id)
                .content(jsonString)
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"));
    }

    @Test
    public void givenWorkersForAdmin_fetchWorkersByAdmin() throws Exception {
        String adminId = "a1";
        EditWorker worker = new EditWorker("123", "worker",
                "**", "John", "Smith", "0412345678");
        EditWorker worker2 = new EditWorker("456", "worker2",
                "**", "John", "Smith", "0412345678");
        List<EditWorker> workers = Arrays.asList(worker, worker2);

        given(service.getWorkersByAdminId(adminId)).willReturn(workers);

        mvc.perform(get("/workers/{adminId}", adminId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is("123")))
                .andExpect(jsonPath("$[1].id", is("456")));
    }
}
