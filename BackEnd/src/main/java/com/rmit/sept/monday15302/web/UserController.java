package com.rmit.sept.monday15302.web;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.rmit.sept.monday15302.Repositories.JwtBlacklistRepository;
import com.rmit.sept.monday15302.exception.UserException;
import com.rmit.sept.monday15302.model.CustomerDetails;
import com.rmit.sept.monday15302.model.JwtBlacklist;
import com.rmit.sept.monday15302.model.User;
import com.rmit.sept.monday15302.security.JwtTokenProvider;
import com.rmit.sept.monday15302.services.CustomerDetailsService;
import com.rmit.sept.monday15302.services.MapValidationErrorService;
import com.rmit.sept.monday15302.services.UserService;
import com.rmit.sept.monday15302.utils.Request.CustomerSignup;
import com.rmit.sept.monday15302.utils.Request.LoginRequest;
import com.rmit.sept.monday15302.utils.Response.JWTLoginSuccessResponse;
import com.rmit.sept.monday15302.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import javax.validation.Valid;
import java.util.Map;

import static com.rmit.sept.monday15302.security.SecurityConstant.TOKEN_PREFIX;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserService userService;

    @Autowired
    private CustomerDetailsService customerDetailsService;

    @Autowired
    private UserValidator userValidator;

    @Autowired
    private JwtBlacklistRepository jwtBlacklistRepository;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody CustomerSignup customerSignup,
                                          BindingResult result, HttpServletRequest request)
            throws JsonProcessingException {

        ObjectMapper o = new ObjectMapper();
        System.out.println(o.writeValueAsString(customerSignup));

         // Validate passwords match
         userValidator.validate(customerSignup, result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null)return errorMap;

        String username = customerSignup.getUsername();
        if (userService.existsByUsername(username)) {
            throw new UserException("Error: Username is already taken!");
        }

        User user = new User(username,
                customerSignup.getPassword(), customerSignup.getType());
        CustomerDetails customer = new CustomerDetails(user, customerSignup.getFname(),
                customerSignup.getLname(), customerSignup.getAddress(),
                customerSignup.getPhoneNumber(), customerSignup.getEmail());
        User newUser = userService.saveUser(user);
        CustomerDetails newCustomer = customerDetailsService.saveCustomer(customer);
        CustomerSignup toReturn = new CustomerSignup(newUser.getUsername(), newUser.getPassword(),
                newUser.getType(), newCustomer.getfName(), newCustomer.getlName(),
                newCustomer.getAddress(), newCustomer.getPhoneNumber(), newCustomer.getEmail());

        return  new ResponseEntity<>(toReturn, HttpStatus.CREATED);
    }

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest,
                                              BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX + tokenProvider.generateToken(authentication);

        User user = userService.getUserByUsername(loginRequest.getUsername());

        return ResponseEntity.ok(new JWTLoginSuccessResponse(true, jwt,
                user.getId(), user.getType()));
    }

    @PutMapping("/logout")
    public JwtBlacklist logout(@RequestBody Map<String,String> json, HttpSession httpSession) {
        String token = json.get("token");
        JwtBlacklist jwtBlacklist = new JwtBlacklist();
        jwtBlacklist.setToken(token);

        return jwtBlacklistRepository.save(jwtBlacklist);
    }

}
