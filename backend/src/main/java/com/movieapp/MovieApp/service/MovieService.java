package com.movieapp.MovieApp.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class MovieService {

    private final RestClient restClient;

    @Value("${tmdb.api.key}")
    private String apiKey;

    public MovieService(RestClient.Builder restClientBuilder, @Value("${tmdb.api.url}") String apiUrl) {
        this.restClient = restClientBuilder
                .baseUrl(apiUrl)
                .build();
    }

    public String getPopular() {
        return restClient.get()
                .uri("/movie/popular?api_key={apiKey}", apiKey)
                .retrieve()
                .body(String.class);
    }

    public String getTopRated() {
        return restClient.get()
                .uri("/movie/top_rated?api_key={apiKey}", apiKey)
                .retrieve()
                .body(String.class);
    }

    public String searchMovies(String query) {
        return restClient.get()
                .uri("/search/movie?api_key={apiKey}&query={query}", apiKey, query)
                .retrieve()
                .body(String.class);
    }

    public String getGenres() {
        return restClient.get()
                .uri("/genre/movie/list?api_key={apiKey}", apiKey)
                .retrieve()
                .body(String.class);
    }

    public String getMoviesByCategory(String genreId) {
        return restClient.get()
                .uri("/discover/movie?api_key={apiKey}&with_genres={genreId}&sort_by=popularity.desc", apiKey, genreId)
                .retrieve()
                .body(String.class);
    }

    public String getMovieDetails(String movieId) {
        return restClient.get()
                .uri("/movie/{movieId}?api_key={apiKey}&language=pt-BR", movieId, apiKey)
                .retrieve()
                .body(String.class);
    }

    public String getMovieVideos(String movieId) {
        return restClient.get()
                .uri("/movie/{movieId}/videos?api_key={apiKey}&language=pt-BR", movieId, apiKey)
                .retrieve()
                .body(String.class);
    }
}
