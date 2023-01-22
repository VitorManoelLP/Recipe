package configuration;

import com.github.tomakehurst.wiremock.WireMockServer;
import com.github.tomakehurst.wiremock.client.WireMock;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

public final class SetupWireMock {

    private SetupWireMock(){}

    public static void start(WireMockServer wireMockServer, String url, HttpStatus status) {
        wireMockServer.stubFor(WireMock.post(WireMock.urlEqualTo(url))
                .willReturn(WireMock.aResponse()
                        .withStatus(status.value())
                        .withHeader("Content-Type", MediaType.APPLICATION_JSON_VALUE)));
    }

}
