import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({ children }) => {

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites")

        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites))
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites]);

    const addFavorite = (movie) => {
        setFavorites(prev => [...prev, movie]);
    }

    const removeFavorite = (id) => {
        setFavorites(prev => prev.filter(movie => movie.id !== id));
    }

    const isFavorite = (id) => {
        return favorites.some(movie => movie.id === id);
    }

    const value = {
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite
    }

    return (
        <MovieContext.Provider value={value}>
            {children}
        </MovieContext.Provider>
    );
};