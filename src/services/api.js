import axios from "axios";

const apiKey = import.meta.env.VITE_API_KEY;
const apiUrl = import.meta.env.VITE_API_URL;

export const getPopular = async () => {
    try {
        const response = await axios.get(`${apiUrl}/movie/popular?api_key=${apiKey}`);
        const data = response.data.results;
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getTopRated = async () => {
    try {
        const response = await axios.get(`${apiUrl}/movie/top_rated?api_key=${apiKey}`);
        const data = response.data.results;
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const searchMovies = async (query) => {
    try {
        const response = await axios.get(`${apiUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`);
        const data = response.data.results;
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getGenres = async () => {
    try {
        const response = await axios.get(`${apiUrl}/genre/movie/list?api_key=${apiKey}`);
        return response.data.genres;
    } catch (error) {
        console.error(error);
        throw error; 
    }
};


export const getMoviesByCategory = async (genreId) => {
    try {
        const response = await axios.get(`${apiUrl}/discover/movie?api_key=${apiKey}&with_genres=${genreId}&sort_by=popularity.desc`);
        return response.data.results;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getMovieDetails = async (movieId) => {
    try {
        const response = await axios.get(`${apiUrl}/movie/${movieId}?api_key=${apiKey}&language=pt-BR`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const getMovieTrailer = async (movieId) => {
    try {
        const response = await axios.get(`${apiUrl}/movie/${movieId}/videos?api_key=${apiKey}&language=pt-BR`);
        const trailer = response.data.results.find(video => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser'));
        return trailer;
    } catch (error) {
        console.error(error);
        throw error;
    }
}