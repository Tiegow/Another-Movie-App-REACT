import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import { Search, AlertCircle, RefreshCw, Trophy, Filter } from 'lucide-react';
import { getPopular, getTopRated, searchMovies, getGenres, getMoviesByCategory } from "../services/api";
import { Link } from "react-router-dom";

function Home() {
    const [searchValue, setSearchValue] = useState("");

    const [topMovies, setTopMovies] = useState([]);
    const [movies, setMovies] = useState([]);

    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState(null);

    const [error, setError] = useState(null);
    const [isLoading, setLoading] = useState(true);

    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            const [popularData, topData, genresData] = await Promise.all([
                getPopular(),
                getTopRated(),
                getGenres()
            ]);

            setMovies(popularData);
            setTopMovies(topData);
            setGenres(genresData);
        } catch (error) {
            console.error(error);
            setError("Falha ao carregar dados iniciais.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadData();
    }, [])

    const handleGenreClick = async (genreId) => {
        setLoading(true);
        setError(null);
        setSearchValue("");

        try {
            if (selectedGenre === genreId) {
                setSelectedGenre(null);
                const popularData = await getPopular();
                setMovies(popularData);
            } else {
                setSelectedGenre(genreId);
                const categoryData = await getMoviesByCategory(genreId);
                setMovies(categoryData);
            }
        } catch (error) {
            console.error(error);
            setError("Erro ao filtrar por categoria.");
        } finally {
            setLoading(false);
        }
    };

    async function handleSearch(e) {
        e.preventDefault();

        if (!searchValue.trim()) return;
        if (isLoading) return;

        setLoading(true);
        setSelectedGenre(null);

        try {
            const searchResults = await searchMovies(searchValue);
            setMovies(searchResults);
            setError(null);
        } catch (error) {
            console.error(error);
            setError("Falha ao buscar filmes.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-10 px-4">

            <div className="max-w-7xl mx-auto flex flex-col gap-8 mb-12">

                {/* --- TOP MOVIES --- */}
                {topMovies.length > 0 && !error && (
                    <div className="w-full">
                        <div className="flex items-center gap-2 mb-4 px-2">
                            <Trophy className="w-5 h-5 text-yellow-500" />
                            <h2 className="text-xl font-bold text-slate-200">Destaques da Crítica</h2>
                        </div>

                        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide snap-x">
                            {topMovies.map((movie) => (
                                <div
                                    key={movie.id}
                                    className="min-w-[160px] md:min-w-[200px] snap-start relative group cursor-pointer transition-transform hover:scale-105 duration-300"
                                >
                                    <Link to={`/movie/${movie.id}`}>
                                        <div className="rounded-xl overflow-hidden shadow-lg border border-slate-800">
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                alt={movie.title}
                                                className="w-full h-full object-cover aspect-[2/3]"
                                            />
                                            <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
                                                <span className="text-yellow-400 text-xs font-bold">★ {movie.vote_average?.toFixed(1)}</span>
                                            </div>
                                        </div>
                                        <h3 className="text-slate-300 text-sm font-medium mt-2 truncate px-1 group-hover:text-white">
                                            {movie.title}
                                        </h3>
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <p className="text-slate-400 text-xs">(Shift + scroll para arrastar)</p>
                    </div>
                )}

                {/* --- BUSCA --- */}
                <h1 className="text-4xl font-bold text-white text-center">
                    Explore o universo do cinema
                </h1>
                <div className="w-full flex justify-center">
                    <form onSubmit={handleSearch} className="w-full max-w-2xl flex gap-2 bg-slate-800/50 p-2 rounded-xl border border-slate-700 backdrop-blur-sm focus-within:border-yellow-500 focus-within:ring-1 focus-within:ring-yellow-500 transition-all duration-300">
                        <input
                            type="text"
                            placeholder="Busque por filmes..."
                            className="flex-1 bg-transparent text-white px-4 py-2 outline-none placeholder-slate-500 font-medium"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <button
                            type="submit"
                            className="bg-yellow-500 hover:bg-yellow-600 text-slate-950 p-3 rounded-lg transition-colors duration-200"
                        >
                            <Search className="w-5 h-5" strokeWidth={3} />
                        </button>
                    </form>
                </div>

                {/* --- GÊNEROS --- */}
                {genres.length > 0 && !error && (
                    <div className="w-full max-w-7xl mx-auto">
                        <div className="flex items-center gap-2 mb-3 px-2">
                            <Filter className="w-4 h-4 text-slate-400" />
                            <span className="text-sm font-medium text-slate-400">Filtrar por categoria:</span>
                        </div>

                        <div className="flex overflow-x-auto gap-3 pb-2 scrollbar-hide mask-fade">
                            {genres.map((genre) => (
                                <button
                                    key={genre.id}
                                    onClick={() => handleGenreClick(genre.id)}
                                    className={`
                                        px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-300 border
                                        ${selectedGenre === genre.id
                                            ? "bg-yellow-500 text-slate-950 border-yellow-500 shadow-lg shadow-yellow-500/20 scale-105"
                                            : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700 hover:border-slate-600"
                                        }
                                    `}
                                >
                                    {genre.name}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

            </div>

            {/* --- GRID PRINCIPAL --- */}
            <div className="max-w-7xl mx-auto">

                {error && (
                    <div className="flex flex-col items-center justify-center py-20 text-center">
                        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl flex flex-col items-center gap-4 max-w-md">
                            <AlertCircle className="w-12 h-12 text-red-500" />
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Ops! Algo deu errado.</h3>
                                <p className="text-slate-400">{error}</p>
                            </div>
                            <button
                                onClick={loadData}
                                className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-full transition-colors font-medium border border-slate-700"
                            >
                                <RefreshCw className="w-4 h-4" /> Tentar Novamente
                            </button>
                        </div>
                    </div>
                )}

                {isLoading && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {[...Array(8)].map((_, index) => (
                            <div key={index} className="bg-slate-900 rounded-xl overflow-hidden border border-slate-800 animate-pulse">
                                <div className="aspect-[2/3] bg-slate-800 w-full" />
                                <div className="p-4 space-y-3">
                                    <div className="h-6 bg-slate-800 rounded w-3/4" />
                                    <div className="flex justify-between">
                                        <div className="h-4 bg-slate-800 rounded w-1/3" />
                                        <div className="h-4 bg-slate-800 rounded w-1/4" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {!isLoading && !error && (
                    <>
                        <h2 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2 animate-fade-in">
                            {searchValue
                                ? `Resultados para: "${searchValue}"`
                                : selectedGenre
                                    ? `Categoria: ${genres.find(g => g.id === selectedGenre)?.name}`
                                    : "Populares no Momento"
                            }
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {movies.map(movie => (
                                <MovieCard movie={movie} key={movie.id} />
                            ))}
                        </div>
                    </>
                )}

            </div>
        </div>
    )
}

export default Home;