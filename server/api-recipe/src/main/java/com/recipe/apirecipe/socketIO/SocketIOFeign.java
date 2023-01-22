package com.recipe.apirecipe.socketIO;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(value = "socket-io", url = "${gateway-url}/api-socket-io")
public interface SocketIOFeign {

    @PostMapping("/socket-io/send")
    void onSocket(@RequestBody MessageDTO messageDTO);

}
