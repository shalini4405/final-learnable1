package com.learnable.controller;

import com.learnable.dto.AuthRequest;
import com.learnable.dto.AuthResponse;
import com.learnable.dto.RegisterRequest;
import com.learnable.service.AuthService;
import com.learnable.service.JwtService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody RegisterRequest request) {
        log.info("Received registration request for email: {}", request.getEmail());
        AuthResponse response = authService.register(request);
        log.info("Successfully registered user: {}", request.getEmail());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        log.info("Received login request for email: {}", request.getEmail());
        AuthResponse response = authService.authenticate(request);
        log.info("Successfully authenticated user: {}", request.getEmail());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/oauth2/success")
    public ResponseEntity<?> handleOAuth2Success(@AuthenticationPrincipal OAuth2User oauth2User) {
        log.info("Handling OAuth2 success for user: {}", oauth2User.getAttribute("email"));
        String email = oauth2User.getAttribute("email");
        String token = jwtService.generateToken(email);
        
        return ResponseEntity.ok(Map.of(
            "token", token,
            "email", email,
            "name", oauth2User.getAttribute("name")
        ));
    }
} 