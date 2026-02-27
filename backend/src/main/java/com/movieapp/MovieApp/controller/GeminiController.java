package com.movieapp.MovieApp.controller;

import com.movieapp.MovieApp.service.GeminiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/quiz")
public class GeminiController {

    private final GeminiService geminiService;

    public GeminiController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/question")
    public ResponseEntity<Map<String, String>> generateQuestion(@RequestBody Map<String, String> request) {
        String movieTitle = request.get("movieTitle");

        if (movieTitle == null || movieTitle.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("error", "movieTitle é obrigatório"));
        }

        try {
            String question = geminiService.generateMovieQuestion(movieTitle);
            return ResponseEntity.ok(Map.of("question", question));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(Map.of("error", "Falha ao gerar pergunta: " + e.getMessage()));
        }
    }
}
