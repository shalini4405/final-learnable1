package com.learnable.controller;

import com.learnable.service.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/recommendations")
@RequiredArgsConstructor
public class RecommendationController {

    private final GeminiService geminiService;

    @PostMapping("/learning-path")
    public ResponseEntity<String> getLearningRecommendation(
            @RequestParam String interests,
            @RequestParam String learningStyle) {
        String recommendation = geminiService.generateLearningRecommendation(interests, learningStyle);
        return ResponseEntity.ok(recommendation);
    }

    @PostMapping("/progress-analysis")
    public ResponseEntity<String> analyzeProgress(
            @RequestParam String learningHistory) {
        String analysis = geminiService.analyzeUserProgress(learningHistory);
        return ResponseEntity.ok(analysis);
    }
} 