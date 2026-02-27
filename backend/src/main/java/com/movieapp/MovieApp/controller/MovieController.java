package com.movieapp.MovieApp.controller;

import com.movieapp.MovieApp.service.MovieService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    private final MovieService movieService;

    public MovieController(MovieService movieService) {
        this.movieService = movieService;
    }

    @GetMapping(value = "/popular", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getPopular() {
        return ResponseEntity.ok(movieService.getPopular());
    }

    @GetMapping(value = "/top_rated", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getTopRated() {
        return ResponseEntity.ok(movieService.getTopRated());
    }

    @GetMapping(value = "/search", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> searchMovies(@RequestParam String query) {
        return ResponseEntity.ok(movieService.searchMovies(query));
    }

    @GetMapping(value = "/genres", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getGenres() {
        return ResponseEntity.ok(movieService.getGenres());
    }

    @GetMapping(value = "/discover", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getMoviesByCategory(@RequestParam String genreId) {
        return ResponseEntity.ok(movieService.getMoviesByCategory(genreId));
    }

    @GetMapping(value = "/{movieId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getMovieDetails(@PathVariable String movieId) {
        return ResponseEntity.ok(movieService.getMovieDetails(movieId));
    }

    @GetMapping(value = "/{movieId}/videos", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getMovieVideos(@PathVariable String movieId) {
        return ResponseEntity.ok(movieService.getMovieVideos(movieId));
    }
}
