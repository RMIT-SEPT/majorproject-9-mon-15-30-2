package com.rmit.sept.monday15302.security;

import com.rmit.sept.monday15302.Repositories.JwtBlacklistRepository;
import com.rmit.sept.monday15302.model.JwtBlacklist;
import com.rmit.sept.monday15302.model.User;
import com.rmit.sept.monday15302.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.context.support.SpringBeanAutowiringSupport;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.annotation.PostConstruct;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.stream.Collectors;

import static com.rmit.sept.monday15302.security.SecurityConstant.HEADER_STRING;
import static com.rmit.sept.monday15302.security.SecurityConstant.TOKEN_PREFIX;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserService userService;

    @Autowired
    private JwtBlacklistRepository jwtBlacklistRepository;

    @PostConstruct
    public void init() {
        SpringBeanAutowiringSupport.processInjectionBasedOnCurrentContext(this);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest httpServletRequest,
            HttpServletResponse httpServletResponse, FilterChain filterChain)
            throws ServletException, IOException {
        try {

            String jwtUtil = getJWTFromRequest(httpServletRequest);
            JwtBlacklist blacklist = jwtBlacklistRepository.findByTokenEquals(jwtUtil);
            if(blacklist != null) {
                throw new ServletException("Invalid token");
            }

            String userId = tokenProvider.getUserIdFromJWT(jwtUtil);
            User userDetails = userService.getUserById(userId);

            if(StringUtils.hasText(jwtUtil)&& tokenProvider.validateToken(jwtUtil)){
                UsernamePasswordAuthenticationToken authentication =
                    new UsernamePasswordAuthenticationToken(userDetails, null,
                            userDetails.getAuthorities());

                String authorities = userDetails.getAuthorities().stream()
                        .map(GrantedAuthority::getAuthority).collect(Collectors.joining());
                System.out.println("Authorities granted : " + authorities);

                authentication.setDetails(new WebAuthenticationDetailsSource()
                        .buildDetails(httpServletRequest));
                SecurityContextHolder.getContext().setAuthentication(authentication);

            } else {
                System.out.println("Not Valid Token");
            }

        } catch (Exception ex){
            logger.error("Could not set user authentication in security context", ex);
        }

        filterChain.doFilter(httpServletRequest, httpServletResponse);

    }

    private String getJWTFromRequest(HttpServletRequest request){
        String bearerToken = request.getHeader(HEADER_STRING);

        if(StringUtils.hasText(bearerToken)&&bearerToken.startsWith(TOKEN_PREFIX)){
            return bearerToken.substring(7);
        }

        return null;
    }
}
