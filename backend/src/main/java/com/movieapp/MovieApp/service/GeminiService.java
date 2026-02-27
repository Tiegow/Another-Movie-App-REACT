package com.movieapp.MovieApp.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.List;
import java.util.Map;

@Service
public class GeminiService {

    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    @Value("${gemini.api.key}")
    private String apiKey;

    @Value("${gemini.model}")
    private String model;

    public GeminiService(RestClient.Builder restClientBuilder, ObjectMapper objectMapper) {
        this.restClient = restClientBuilder
                .baseUrl("https://generativelanguage.googleapis.com")
                .build();
        this.objectMapper = objectMapper;
    }

    public String generateMovieQuestion(String movieTitle) {
        String prompt = """
                Você é um especialista em cinema. Gere UMA pergunta curta ou um fato/curiosidade sobre o filme "%s".

                Regras obrigatórias:
                - NÃO mencione o nome do filme na resposta, de forma alguma.
                - NÃO mencione nomes de personagens exclusivos do filme que tornem a resposta óbvia demais.
                - A pergunta deve ser no formato "Qual desses filmes..." ou um fato como "Neste filme..." ou "Este filme é conhecido por...".
                - Seja criativo: use curiosidades dos bastidores, cenas icônicas, trilha sonora, diretor, temática, contexto histórico, etc.
                - Responda APENAS com a pergunta/fato, sem explicações adicionais.
                - A resposta deve ter no máximo 2 frases.
                - Responda em português brasileiro.
                """
                .formatted(movieTitle);

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(
                                Map.of("text", prompt)))));

        String url = "/v1beta/models/%s:generateContent?key=%s".formatted(model, apiKey);

        String responseJson = restClient.post()
                .uri(url)
                .contentType(MediaType.APPLICATION_JSON)
                .body(requestBody)
                .retrieve()
                .body(String.class);

        try {
            JsonNode root = objectMapper.readTree(responseJson);
            return root
                    .path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText()
                    .trim();
        } catch (Exception e) {
            throw new RuntimeException("Erro ao processar resposta do Gemini", e);
        }
    }
}
