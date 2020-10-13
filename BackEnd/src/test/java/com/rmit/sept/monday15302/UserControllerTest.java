package com.rmit.sept.monday15302;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.sept.monday15302.Repositories.JwtBlacklistRepository;
import com.rmit.sept.monday15302.exception.UserException;
import com.rmit.sept.monday15302.model.CustomerDetails;
import com.rmit.sept.monday15302.model.JwtBlacklist;
import com.rmit.sept.monday15302.model.User;
import com.rmit.sept.monday15302.model.UserType;
import com.rmit.sept.monday15302.security.JwtAuthenticationEntryPoint;
import com.rmit.sept.monday15302.security.JwtAuthenticationFilter;
import com.rmit.sept.monday15302.security.JwtTokenProvider;
import com.rmit.sept.monday15302.services.CustomerDetailsService;
import com.rmit.sept.monday15302.services.MapValidationErrorService;
import com.rmit.sept.monday15302.services.SessionService;
import com.rmit.sept.monday15302.services.UserService;
import com.rmit.sept.monday15302.utils.Request.CustomerSignup;
import com.rmit.sept.monday15302.utils.Request.LoginRequest;
import com.rmit.sept.monday15302.utils.Utility;
import com.rmit.sept.monday15302.web.UserController;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(UserController.class)
@AutoConfigureMockMvc(addFilters=false)
public class UserControllerTest {
    @Autowired
    private MockMvc mvc;

    @MockBean
    private Utility utility;

    @MockBean
    private CustomerDetailsService customerDetailsService;

    @MockBean
    private JwtBlacklistRepository jwtBlacklistRepository;

    @MockBean
    private MapValidationErrorService mapValidationErrorService;

    private ObjectMapper objectMapper = new ObjectMapper();

    @MockBean
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

    @MockBean
    private UserService userService;

    @MockBean
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @MockBean
    private JwtTokenProvider tokenProvider;

    @MockBean
    private AuthenticationManager authenticationManager;

    @MockBean
    private JwtAuthenticationFilter jwtAuthenticationFilter;

    @MockBean
    private SessionService sessionService;

    private static CustomerSignup signUp = new CustomerSignup("customer", "******",
            UserType.ROLE_CUSTOMER, "John", "Smith", "Melbourne",
            "0123456789", "john@gmail.com", "******");
    private static User user = new User(signUp.getUsername(), signUp.getPassword(),
            signUp.getType());

    @Test
    public void register_returnCreatedStatus_ifUserCreated() throws Exception {
        CustomerDetails customer = new CustomerDetails(user, signUp.getFname(),
                signUp.getLname(), signUp.getAddress(),
                signUp.getPhoneNumber(), signUp.getEmail());
        given(userService.saveUser(Mockito.any(User.class))).willReturn(user);
        given(customerDetailsService.saveCustomer(Mockito.any(CustomerDetails.class)))
                .willReturn(customer);
        given(userService.existsByUsername("customer")).willReturn(false);
        String jsonString = objectMapper.writeValueAsString(signUp);
        mvc.perform(post("/api/users/register")
                .content(jsonString)
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(content().contentType("application/json"));
    }

    @Test
    public void register_throwException_ifUsernameDuplicated() throws Exception {
        String jsonString = objectMapper.writeValueAsString(signUp);
        given(userService.existsByUsername("customer")).willReturn(true);
        mvc.perform(post("/api/users/register")
                .content(jsonString)
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void register_throwException_ifPasswordInvalid() throws Exception {
        doThrow(new UserException("")).when(utility).validatePassword(Mockito.any(String.class), Mockito.any(String.class));
        String jsonString = objectMapper.writeValueAsString(signUp);
        mvc.perform(post("/api/users/register")
                .content(jsonString)
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isBadRequest());
    }

    @Test
    public void login_returnOkStatus_ifUserLoggedIn() throws Exception {
        List<GrantedAuthority> list = new ArrayList<>();
        list.add(new SimpleGrantedAuthority("ROLE_CUSTOMER"));
        UsernamePasswordAuthenticationToken auth =
                new UsernamePasswordAuthenticationToken(user, null, list);
        SecurityContextHolder.getContext().setAuthentication(auth);
        LoginRequest request = new LoginRequest("customer", "******");
        given(userService.getUserByUsername(request.getUsername())).willReturn(user);
        String jsonString = objectMapper.writeValueAsString(request);
        mvc.perform(post("/api/users/login")
                .content(jsonString)
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"));
    }

    @Test
    public void logout_returnInvalidToken_ifUserLoggedOut() throws Exception {
        JwtBlacklist jwt = new JwtBlacklist();
        jwt.setId("1");
        jwt.setToken("Bearer abc");
        given(jwtBlacklistRepository.save(Mockito.any(JwtBlacklist.class))).willReturn(jwt);
        String request = "{\"token\":\"Bearer abc\"}";
        mvc.perform(put("/api/users/logout")
                .content(request)
                .contentType(MediaType.APPLICATION_JSON).accept(MediaType.APPLICATION_JSON));
    }
}
