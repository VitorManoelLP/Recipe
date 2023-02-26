package com.gateway.apigateway.config.security;


import com.gateway.apigateway.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AuthorizeHttpRequestsConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
@ComponentScan("com.gateway.apigateway.config.security")
public class WebSecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final UserService userService;

    @Bean
    @SneakyThrows
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) {
        httpSecurity.csrf().disable();
        httpSecurity.authorizeHttpRequests(this::configureRequestMatchers);
        return httpSecurity.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        final DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setPasswordEncoder(password());
        authenticationProvider.setUserDetailsService(userDetailsService());
        return authenticationProvider;
    }

    @Bean
    public PasswordEncoder password() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public UserDetailsService userDetailsService() {
        return userService;
    }

    @SneakyThrows
    private void configureRequestMatchers(AuthorizeHttpRequestsConfigurer<HttpSecurity>.AuthorizationManagerRequestMatcherRegistry request) {
        request
                .requestMatchers(
                        "/api/authentication/**",
                        "/actuator/**"
                )
                .permitAll()
                .anyRequest().authenticated()
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
    }
}
