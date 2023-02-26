package com.gateway.apigateway.resource;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

public class AuthenticationResourceTest {

    private static MockMvc mockMvc;

    @BeforeAll
    public static void setup() {
        AuthenticationResource resource = new AuthenticationResource();
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
