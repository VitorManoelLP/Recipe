package com.gateway.apigateway.config.security;

import com.gateway.apigateway.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.apache.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Objects;

@Component
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final UserRepository userRepository;

    private final JwtTokenValidator jwtTokenValidator;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if (isInvalidToken(authHeader)) {
            filterChain.doFilter(request, response);
            return;
        }

        final String token = authHeader.substring(7);
        final String username = jwtTokenValidator.getUsername(token);

        if (Objects.nonNull(username) && Objects.isNull(SecurityContextHolder.getContext().getAuthentication())) {

            final var userDetails = (UserDetails) userRepository.findOneThrow(username);

            if (jwtTokenValidator.isValidToken(token, userDetails)) {
                final UsernamePasswordAuthenticationToken auth = getAuth(userDetails);
                auth.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                SecurityContextHolder.getContext().setAuthentication(auth);
            }

        }

        filterChain.doFilter(request, response);
    }

    private static UsernamePasswordAuthenticationToken getAuth(UserDetails userDetails) {
        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

    private boolean isInvalidToken(String authHeader) {
        return Objects.isNull(authHeader) || !authHeader.startsWith("Bearer");
    }
}
