package com.rmit.sept.monday15302;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.sept.monday15302.model.*;
import com.rmit.sept.monday15302.security.JwtAuthenticationEntryPoint;
import com.rmit.sept.monday15302.security.JwtAuthenticationFilter;
import com.rmit.sept.monday15302.services.*;
import com.rmit.sept.monday15302.utils.Request.EditWorker;
import com.rmit.sept.monday15302.utils.Request.WorkerSignup;
import com.rmit.sept.monday15302.utils.Utility;
import com.rmit.sept.monday15302.web.WorkerController;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
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
@AutoConfigureMockMvc(addFilters=false)
public class WorkerControllerTest {
    @Autowired
    private MockMvc mvc;

    @MockBean
    private WorkerDetailsService service;

    @MockBean
    private SessionService sessionService;

    @MockBean
    private MapValidationErrorService mapValidationErrorService;

    @MockBean
    private AdminDetailsService adminDetailsService;

    private ObjectMapper objectMapper = new ObjectMapper();

    @MockBean
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @MockBean
    private UserService userService;

    @MockBean
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @MockBean
    private Utility utility;

    private static String workerId = "w1";
    private static String adminId = "a1";

    @Test
    public void testGetWorkerById() throws Exception {

        EditWorker worker = new EditWorker();
        worker.setId(workerId);

        given(service.getWorkerById(workerId, adminId)).willReturn(worker);

        mvc.perform(get("/admin/worker/{id}/{adminId}", workerId, adminId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(workerId)));
    }

    @Test
    public void createNewWorker_returnCreatedStatus_ifWorkerSaved() throws Exception {
        User user = new User("admin", "******", UserType.ROLE_ADMIN);
        user.setId(adminId);
        AdminDetails admin = new AdminDetails("Haircut", "Business", user);
        admin.setId(adminId);

        User newUser = new User("worker", "******", UserType.ROLE_WORKER);
        WorkerDetails worker = new WorkerDetails(newUser,
                "John", "Smith", admin, "0412345678");

        given(userService.saveUser(Mockito.any(User.class))).willReturn(newUser);
        given(service.saveWorker(Mockito.any(WorkerDetails.class), eq(newUser.getUsername())))
                .willReturn(worker);

        WorkerSignup workerSignup = new WorkerSignup("worker", "******",
                "John", "Smith", adminId, "0412345678");

        String jsonString = objectMapper.writeValueAsString(workerSignup);

        mvc.perform(post("/admin/createWorker")
                .content(jsonString)
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(content().contentType("application/json"));
    }

    @Test
    public void createNewWorker_throwException_ifUserNameExists() throws Exception {
        User user = new User("admin", "******", UserType.ROLE_ADMIN);
        AdminDetails admin = new AdminDetails("Haircut", "Business", user);
        admin.setId(adminId);

        WorkerSignup workerSignup = new WorkerSignup("worker", "******",
                "John", "Smith", adminId, "0412345678");

        String jsonString = objectMapper.writeValueAsString(workerSignup);

        given(userService.existsByUsername(eq("worker"))).willReturn(true);

        mvc.perform(post("/admin/createWorker")
                .content(jsonString)
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void testDeleteWorker() throws Exception {
        mvc.perform(delete("/admin/deleteWorker/{id}/{adminId}", workerId, adminId)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

    @Test
    public void testUpdateWorker() throws Exception {
        EditWorker worker = new EditWorker(workerId, "worker","John", "Smith", "0412345678");

        given(service.updateWorker(Mockito.any(EditWorker.class), eq(workerId), eq(adminId)))
                .willReturn(worker);

        String jsonString = objectMapper.writeValueAsString(worker);

        mvc.perform(put("/admin/editWorker/{id}/{adminId}", workerId, adminId)
                .content(jsonString)
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"));
    }

    @Test
    public void testGetWorkersByAdmin() throws Exception {
        EditWorker worker = new EditWorker(workerId, "worker",
                "John", "Smith", "0412345678");
        EditWorker worker2 = new EditWorker("456", "worker2",
                "John", "Smith", "0412345678");
        List<EditWorker> workers = Arrays.asList(worker, worker2);

        given(service.getWorkersByAdminId(adminId)).willReturn(workers);

        mvc.perform(get("/admin/workers/{adminId}", adminId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(2)))
                .andExpect(jsonPath("$[0].id", is(workerId)))
                .andExpect(jsonPath("$[1].id", is("456")));
    }

    @Test
    public void getWorkerProfileById_returnOKStatus_ifAuthorized() throws Exception {

        WorkerDetails worker = new WorkerDetails();
        worker.setId(workerId);

        given(service.getWorkerProfileById(workerId)).willReturn(worker);
        given(utility.isCurrentLoggedInUser(workerId)).willReturn(true);

        mvc.perform(get("/worker/profile/{id}", workerId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(workerId)));
    }

    @Test
    public void getWorkerProfileById_return401_ifUnauthorized() throws Exception {
        given(utility.isCurrentLoggedInUser(workerId)).willReturn(false);

        mvc.perform(get("/worker/profile/{id}", workerId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void getSessionsByWorkerId_return401_ifUnauthorized() throws Exception {
        given(utility.isCurrentLoggedInUser(workerId)).willReturn(false);
        mvc.perform(get("/worker/sessions/{worker_id}", workerId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void getSessionsByWorkerId_returnOKStatus_ifAuthorized() throws Exception {
        List<Session> sessions = new ArrayList<>();
        given(utility.isCurrentLoggedInUser(workerId)).willReturn(true);
        given(sessionService.getSessionsByWorkerId(workerId)).willReturn(sessions);
        mvc.perform(get("/worker/sessions/{worker_id}", workerId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }
}
