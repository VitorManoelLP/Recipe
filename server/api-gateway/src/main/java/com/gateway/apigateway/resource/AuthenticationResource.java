package com.gateway.apigateway.resource;

import com.gateway.apigateway.domain.User;
import com.gateway.apigateway.dto.TokenDTO;
import com.gateway.apigateway.service.AuthenticationService;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/authentication")
@AllArgsConstructor
public class AuthenticationResource {

    private final AuthenticationService service;

    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TokenDTO> login(@RequestBody User user) {
        return ResponseEntity.ok(service.login(user));
    }

    @PostMapping(value = "/verify")
    public ResponseEntity<Boolean> verifyToken(@RequestBody TokenDTO tokenDTO) {
        return ResponseEntity.ok(service.verifyToken(tokenDTO));
    }
}
