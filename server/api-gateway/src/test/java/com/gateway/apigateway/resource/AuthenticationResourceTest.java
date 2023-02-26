package com.gateway.apigateway.resource;

import com.gateway.apigateway.service.AuthenticationService;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class AuthenticationResourceTest {

    private static MockMvc mockMvc;

    @Autowired
    private static AuthenticationService service;

    @BeforeAll
    public static void setup() {
        AuthenticationResource resource = new AuthenticationResource(service);
        mockMvc = MockMvcBuilders.standaloneSetup(resource).build();
    }

    @Test
    public void login() throws Exception {
        mockMvc.perform(post("/api/authentication/login")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }

}
