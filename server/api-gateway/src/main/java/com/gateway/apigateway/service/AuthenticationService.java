package com.gateway.apigateway.service;

import com.gateway.apigateway.config.security.JwtTokenValidator;
import com.gateway.apigateway.domain.User;
import com.gateway.apigateway.dto.TokenDTO;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationCredentialsNotFoundException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@AllArgsConstructor
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;

    private final UserService userService;
    private final JwtTokenValidator jwtTokenValidator;

    public TokenDTO login(User user) {

        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword()));

        final UserDetails userDetails = userService.loadUserByUsername(user.getEmail());

        if (Objects.nonNull(userDetails)) {
            return new TokenDTO(jwtTokenValidator.generateToken(userDetails));
        }

        throw new AuthenticationCredentialsNotFoundException("Usuário não encontrado.");
    }

    public Boolean verifyToken(TokenDTO tokenDTO) {
        try {
            String token = tokenDTO.getToken();
            String username = jwtTokenValidator.getUsername(token);
            UserDetails userDetails = userService.loadUserByUsername(username);
            return jwtTokenValidator.isValidToken(token, userDetails);
        } catch (Exception e) {
            return false;
        }
    }

}
