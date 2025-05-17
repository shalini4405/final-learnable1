package com.learnable.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class GeminiService {

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.api.url}")
    private String apiUrl;

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public String generateLearningRecommendation(String userInterests, String learningStyle) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> content = new HashMap<>();
            content.put("text", String.format(
                "Based on the user's interests in %s and learning style %s, " +
                "provide a personalized learning recommendation in JSON format with suggested topics, " +
                "resources, and estimated time commitment.",
                userInterests, learningStyle
            ));

            Map<String, Object> request = new HashMap<>();
            request.put("contents", List.of(Map.of("parts", List.of(content))));

            String url = apiUrl + ":generateContent?key=" + apiKey;
            
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);
            
            return restTemplate.postForObject(url, entity, String.class);
        } catch (Exception e) {
            return "Error generating recommendation: " + e.getMessage();
        }
    }

    public String analyzeUserProgress(String learningHistory) {
        try {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            Map<String, Object> content = new HashMap<>();
            content.put("text", String.format(
                "Analyze the user's learning history: %s. " +
                "Provide insights on progress, areas for improvement, and next steps in JSON format.",
                learningHistory
            ));

            Map<String, Object> request = new HashMap<>();
            request.put("contents", List.of(Map.of("parts", List.of(content))));

            String url = apiUrl + ":generateContent?key=" + apiKey;
            
            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(request, headers);
            
            return restTemplate.postForObject(url, entity, String.class);
        } catch (Exception e) {
            return "Error analyzing progress: " + e.getMessage();
        }
    }
} 