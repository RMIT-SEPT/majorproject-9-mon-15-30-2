package com.rmit.sept.monday15302;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.sept.monday15302.model.Session;
import com.rmit.sept.monday15302.model.WorkerDetails;
import com.rmit.sept.monday15302.security.SecurityConfig;
import com.rmit.sept.monday15302.services.MapValidationErrorService;
import com.rmit.sept.monday15302.services.SessionService;
import com.rmit.sept.monday15302.utils.Request.SessionCreated;
import com.rmit.sept.monday15302.web.SessionController;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.text.ParseException;
import java.util.Arrays;
import java.util.List;

import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@RunWith(SpringRunner.class)
@WebMvcTest(SessionController.class)
public class SessionControllerTest {
    @Autowired
    private MockMvc mvc;

    @MockBean
    private SessionService service;

    @MockBean
    private MapValidationErrorService mapValidationErrorService;

    private ObjectMapper objectMapper = new ObjectMapper();

    @MockBean
    private SecurityConfig securityConfig;

    private static Session session;
    private static String workerId = "w1";

    @Before
    public void setup() throws ParseException {
        WorkerDetails worker = new WorkerDetails();
        worker.setId(workerId);
        session = new Session(worker, 1,
                "08:00:00", "09:00:00", "Haircut");
    }

    @Test
    @WithMockUser(username = "admin1", password = "******", roles = "ROLE_ADMIN")
    public void testCreateSession_itReturnsOK() throws Exception {
        SessionCreated sessionCreated = new SessionCreated(1,
                "08:00:00", "09:00:00", workerId);

        given(service.saveSession(Mockito.any(SessionCreated.class))).willReturn(session);

        String jsonString = objectMapper.writeValueAsString(sessionCreated);

        mvc.perform(post("/admin/createSession")
                .content(jsonString)
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(content().contentType("application/json"));
    }

    @Test
    @WithMockUser(username = "admin1", password = "******", roles = "ROLE_ADMIN")
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

}
