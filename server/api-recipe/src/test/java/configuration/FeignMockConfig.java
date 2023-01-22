package configuration;

import com.recipe.apirecipe.socketIO.SocketIOFeign;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;

import static org.mockito.Mockito.mock;

@TestConfiguration
public class FeignMockConfig {

    @Bean
    public SocketIOFeign socketIOFeign() {
        return mock(SocketIOFeign.class);
    }

}
