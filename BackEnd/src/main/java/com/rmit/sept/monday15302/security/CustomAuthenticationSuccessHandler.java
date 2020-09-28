package com.rmit.sept.monday15302.security;

import com.rmit.sept.monday15302.model.User;
import com.rmit.sept.monday15302.model.UserType;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.Collection;

@Component
@Configuration
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler
{
    @Override
    public void onAuthenticationSuccess(HttpServletRequest httpServletRequest,
                                        HttpServletResponse httpServletResponse,
                                        Authentication authentication)
            throws IOException, ServletException, RuntimeException
    {
        HttpSession session = httpServletRequest.getSession();
        User authUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        session.setAttribute("username", authUser.getUsername());
        //set our response to OK status
        httpServletResponse.setStatus(HttpServletResponse.SC_OK);
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        authorities.forEach(authority -> {
            if(authority.getAuthority().equals("ROLE_ADMIN")) {
                session.setAttribute("role", UserType.ROLE_ADMIN.toString());
                try {
                    //since we have created our custom success handler, its up to us to where
                    //we will redirect the user after successfully login
                    httpServletResponse.sendRedirect("/admin");
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            } else if (authority.getAuthority().equals("ROLE_CUSTOMER")) {
                session.setAttribute("role", UserType.ROLE_CUSTOMER.toString());
                try {
                    //since we have created our custom success handler, its up to us to where
                    //we will redirect the user after successfully login
                    httpServletResponse.sendRedirect("/customer");
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            } else if (authority.getAuthority().equals("ROLE_WORKER")) {
                session.setAttribute("role", UserType.ROLE_WORKER.toString());
                try {
                    //since we have created our custom success handler, its up to us to where
                    //we will redirect the user after successfully login
                    httpServletResponse.sendRedirect("/worker");
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            }
        });

    }
}