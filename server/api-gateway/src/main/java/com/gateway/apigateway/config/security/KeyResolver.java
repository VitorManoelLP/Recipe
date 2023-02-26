package com.gateway.apigateway.config.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwsHeader;
import io.jsonwebtoken.SigningKeyResolverAdapter;
import io.jsonwebtoken.security.Keys;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Base64;

@Component
@AllArgsConstructor
@NoArgsConstructor
public class KeyResolver extends SigningKeyResolverAdapter {

    @Value("${jwt.secret}")
    private String jwtSecret;

    @Override
    public Key resolveSigningKey(JwsHeader header, Claims claims) {
        return Keys.hmacShaKeyFor(generateSafeSecret());
    }

    private byte[] generateSafeSecret() {
        byte[] key = jwtSecret.getBytes();
        var encoder = Base64.getUrlEncoder().withoutPadding();
        return encoder.encode(key);
    }

}
