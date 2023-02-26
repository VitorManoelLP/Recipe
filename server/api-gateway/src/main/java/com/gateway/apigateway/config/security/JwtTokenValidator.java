package com.gateway.apigateway.config.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;
import java.util.function.Function;

@NoArgsConstructor
@Component
public final class JwtTokenValidator {

    @Value("${jwt.secret}")
    private String jwtSecret;

    private final int HOURS_TO_EXPIRE = 2;

    public String generateToken(UserDetails userDetails) {
        Map<String, String> claims = new HashMap<>();
        return createToken(claims, userDetails);
    }

    private String createToken(Map<String, String> claims, UserDetails userDetails) {
        return Jwts.builder()
                .setSubject(userDetails.getUsername())
                .claim("authorities", userDetails.getAuthorities())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + TimeUnit.HOURS.toMillis(HOURS_TO_EXPIRE)))
                .signWith(Keys.hmacShaKeyFor(generateSafeSecret()))
                .compact();
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public Boolean isValidToken(String token, UserDetails userDetails) {
        final String username = getUsername(token);
        return username.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    public String getUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder().setSigningKeyResolver(new KeyResolver(jwtSecret)).build().parseClaimsJws(token).getBody();
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private byte[] generateSafeSecret() {
        byte[] bytes = jwtSecret.getBytes();
        var encoder = Base64.getUrlEncoder().withoutPadding();
        return encoder.encode(bytes);
    }

}