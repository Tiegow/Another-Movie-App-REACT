import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

export const getPopular = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/movies/popular`);
        const data = response.data.results;
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getTopRated = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/movies/top_rated`);
        const data = response.data.results;
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const searchMovies = async (query) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/movies/search?query=${encodeURIComponent(query)}`);
        const data = response.data.results;
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getGenres = async () => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/movies/genres`);
        return response.data.genres;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getMoviesByCategory = async (genreId) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/movies/discover?genreId=${genreId}`);
        return response.data.results;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getMovieDetails = async (movieId) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/movies/${movieId}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getMovieTrailer = async (movieId) => {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/movies/${movieId}/videos`);
        const trailer = response.data.results.find(video => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser'));
        return trailer;
    } catch (error) {
        console.error(error);
        throw error;
    }
}