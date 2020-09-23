package com.rmit.sept.monday15302.web;

import com.rmit.sept.monday15302.exception.UserException;
import com.rmit.sept.monday15302.model.CustomerDetails;
import com.rmit.sept.monday15302.model.User;
import com.rmit.sept.monday15302.security.JwtTokenProvider;
import com.rmit.sept.monday15302.services.CustomerDetailsService;
import com.rmit.sept.monday15302.services.MapValidationErrorService;
import com.rmit.sept.monday15302.services.UserService;
import com.rmit.sept.monday15302.utils.Request.CustomerSignup;
import com.rmit.sept.monday15302.utils.Request.LoginRequest;
import com.rmit.sept.monday15302.utils.Response.JWTLoginSucessReponse;
import com.rmit.sept.monday15302.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

import static com.rmit.sept.monday15302.security.SecurityConstant.TOKEN_PREFIX;


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

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody CustomerSignup customerSignup,
                                          BindingResult result){
         // Validate passwords match
         userValidator.validate(customerSignup, result);

        // Add validator to check for password length and confirm password match

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
        String jwt = TOKEN_PREFIX +  tokenProvider.generateToken(authentication);

        User user = userService.getUserByUsername(loginRequest.getUsername());

        return ResponseEntity.ok(new JWTLoginSucessReponse(true, jwt,
                user.getId(), user.getType()));
    }

}
