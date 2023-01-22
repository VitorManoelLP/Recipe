package com.gateway.apigateway;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.reactive.server.WebTestClient;

@SpringBootTest
@ExtendWith(SpringExtension.class)
class ApiGatewayApplicationTests {

    @Autowired
    private ApplicationContext context;

    @Test
    public void checkGatewayApiRecipe() {
        WebTestClient client = WebTestClient.bindToApplicationContext(context).build();
        client.get().uri("/api-recipe/actuator/info").exchange().expectStatus().isOk();
    }

}
