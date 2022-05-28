package com.digitazon.Villacastellaccia.models.utilities.security.auth;

import com.digitazon.Villacastellaccia.models.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    private boolean hasAuthoririzationHeader(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        System.out.println("Aithorization header " + header);
        if (ObjectUtils.isEmpty(header) || !header.startsWith("Bearer")) {
            return false;
        }
        return true;
    }

    private String getAccessToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        String token = header.split(" ")[1].trim();
        System.out.println("Access token: " + token);
        return token;
    }

    private UserDetails getUserDetails(String  accessToken) {
        User userDetails = new User();
        String[] subjectArray = jwtTokenUtil.getSubject(accessToken).split(",");
        userDetails.setId(Integer.parseInt(subjectArray[0]));
        userDetails.setName(subjectArray[1]);
        return userDetails;
    }

    private void setAuthenticationContext(String accessToken, HttpServletRequest request) {
        UserDetails userDetails = getUserDetails(accessToken);

        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(userDetails,
                null, null);
        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        if (!hasAuthoririzationHeader(request)) {
            filterChain.doFilter(request, response);
            return;
        }
        String accessToken = getAccessToken(request);
        if (!jwtTokenUtil.validateAccessToke(accessToken)) {
            filterChain.doFilter(request, response);
            return;
        }
        setAuthenticationContext(accessToken, request);
        filterChain.doFilter(request, response);
    }
}
