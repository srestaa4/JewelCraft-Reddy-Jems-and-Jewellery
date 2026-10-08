package com.jewelcraft.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(cors -> {})
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/api/jewellery/**").permitAll()
                .requestMatchers("/api/designs/**").permitAll()
                .requestMatchers("/api/metals/**").permitAll()
                .requestMatchers("/api/diamonds/**").permitAll()
                .requestMatchers("/api/diamond-shapes/**").permitAll()
                .requestMatchers("/api/customizations/**").permitAll()
                .requestMatchers("/api/showrooms/**").permitAll()
                .requestMatchers("/api/appointments/**").permitAll()
                .requestMatchers("/api/quotations/**").permitAll()
                .requestMatchers("/api/admin/**").permitAll()
                .anyRequest().authenticated()
            );

        return http.build();
    }
}
