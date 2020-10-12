package com.rmit.sept.monday15302;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.sept.monday15302.model.Session;
import com.rmit.sept.monday15302.model.WorkerDetails;
import com.rmit.sept.monday15302.security.CustomAuthenticationSuccessHandler;
import com.rmit.sept.monday15302.security.JwtAuthenticationEntryPoint;
import com.rmit.sept.monday15302.security.JwtAuthenticationFilter;
import com.rmit.sept.monday15302.services.*;
import com.rmit.sept.monday15302.utils.Request.EditWorker;
import com.rmit.sept.monday15302.utils.Request.SessionCreated;
import com.rmit.sept.monday15302.utils.Response.SessionReturn;
import com.rmit.sept.monday15302.utils.Utility;
import com.rmit.sept.monday15302.web.SessionController;
import org.junit.Before;
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

import java.text.ParseException;
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
@WebMvcTest(SessionController.class)
@AutoConfigureMockMvc(addFilters=false)
public class SessionControllerTest {
    @Autowired
    private MockMvc mvc;

    @MockBean
    private SessionService service;

    @MockBean
    private MapValidationErrorService mapValidationErrorService;

    private ObjectMapper objectMapper = new ObjectMapper();

    @MockBean
    private Utility utility;

    @MockBean
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @MockBean
    private CustomUserService customUserService;

    @MockBean
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @MockBean
    private CustomAuthenticationSuccessHandler successHandler;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @MockBean
    private WorkerDetailsService workerDetailsService;

    @MockBean
    private WorkingHoursService workingHoursService;

    private static Session session;
    private static String workerId = "w1";
    private static String adminId = "a1";
    private static SessionCreated session1;
    private static String sessionId = "s1";

    @Before
    public void setup() throws ParseException {
        WorkerDetails worker = new WorkerDetails();
        worker.setId(workerId);
        session = new Session(worker, 1,
                "08:00:00", "09:00:00", "Haircut");
        session1 = new SessionCreated(1,
                "08:00:00", "09:00:00", workerId);
    }

    @Test
    public void testCreateSession_itReturnsOK() throws Exception {

        given(service.saveSession(Mockito.any(SessionCreated.class))).willReturn(session);

        String jsonString = objectMapper.writeValueAsString(session1);

        mvc.perform(post("/admin/createSession")
                .content(jsonString)
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(content().contentType("application/json"));
    }

    @Test
    public void testGetSessionsByWorkerAndDay() throws Exception {
        String workerId = "1";
        int day = 4;
        WorkerDetails worker = new WorkerDetails();
        worker.setId(workerId);

        Session session = new Session(worker, day, "08:00:00",
                "09:00:00", "Haircut");
        List<Session> sessions = Arrays.asList(session);
        given(service.getSessionsByWorkerIdAndDay(workerId, day))
                .willReturn(sessions);
        mvc.perform(get("/admin/sessions/{workerId}/{day}", workerId, day)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].day", is(day)))
                .andExpect(jsonPath("$[0].startTime", is("08:00:00")));
    }

    @Test
    public void getSessionsByAdminId_returnSessions_ifAuthorized() throws Exception {
        given(utility.isCurrentLoggedInUser(adminId)).willReturn(true);
        List<SessionCreated> sessions = Arrays.asList(session1);
        given(service.getSessionsByAdminId(adminId)).willReturn(sessions);
        mvc.perform(get("/admin/sessions/{adminId}", adminId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].day", is(1)))
                .andExpect(jsonPath("$[0].startTime", is("08:00:00")));
    }

    @Test
    public void getSessionsByAdminId_throw401_ifUnauthorized() throws Exception {
        given(utility.isCurrentLoggedInUser(adminId)).willReturn(false);
        mvc.perform(get("/admin/sessions/{adminId}", adminId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void getSessionById_returnSession_ifAuthorized() throws Exception {
        given(utility.isCurrentLoggedInUser(adminId)).willReturn(true);
        session.setId(sessionId);
        given(service.getSessionById(sessionId)).willReturn(session);
        mvc.perform(get("/admin/session/{sessionId}/{adminId}", sessionId, adminId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id", is(sessionId)))
                .andExpect(jsonPath("$.day", is(1)));
    }

    @Test
    public void getSessionById_throw401_ifUnauthorized() throws Exception {
        given(utility.isCurrentLoggedInUser(adminId)).willReturn(false);
        mvc.perform(get("/admin/session/{sessionId}/{adminId}", sessionId, adminId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void updateSessions_returnSessionAndStatusOK() throws Exception {
        given(service.updateSession(Mockito.any(SessionCreated.class), eq(sessionId))).willReturn(session);
        String jsonString = objectMapper.writeValueAsString(session);
        mvc.perform(put("/admin/editSession/{sessionId}", sessionId)
                .content(jsonString)
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"));
    }

    @Test
    public void getSessionsWithinAWeekByWorkerId_throw401_ifUnAuthorized() throws Exception {
        EditWorker worker = new EditWorker();
        given(workerDetailsService.getWorkerById(workerId, adminId)).willReturn(worker);
        given(utility.isCurrentLoggedInUser(adminId)).willReturn(false);
        mvc.perform(get("/admin/availableSessions/{workerId}/{adminId}", workerId, adminId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isUnauthorized());
    }

    @Test
    public void getSessionsWithinAWeekByWorkerId_returnSessions_ifAuthorized() throws Exception {
        given(workerDetailsService.getWorkerById(workerId, adminId)).willReturn(new EditWorker());
        given(utility.isCurrentLoggedInUser(adminId)).willReturn(true);
        List<SessionReturn> sessions = new ArrayList<>();
        given(service.getSessionsWithinAWeekByWorkerId(workerId)).willReturn(sessions);
        mvc.perform(get("/admin/availableSessions/{workerId}/{adminId}", workerId, adminId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(0)));
    }

    @Test
    public void resetSession_returnTrueOfFalse_ifSuccessfully() throws Exception {
        String request = "{\"isReset\":1}";
        mvc.perform(put("/admin/resetSessions/{adminId}", adminId)
                .content(request)
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
