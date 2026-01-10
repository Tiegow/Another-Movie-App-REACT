import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
    Star, 
    Calendar, 
    Clock, 
    ArrowLeft, 
    Play
} from "lucide-react";
import { getMovieDetails } from "../services/api";
import { useMovieContext } from "../contexts/MovieContext";

import { getMovieTrailer } from "../services/api";

function MoviePage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);
    const [loading, setLoading] = useState(true);

    const { isFavorite, addFavorite, removeFavorite } = useMovieContext();
    const favorite = movie ? isFavorite(movie.id) : false;

    const formatCurrency = (number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(number);
    };

    const formatRuntime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    useEffect(() => {
        const fetchMovie = async () => {
            setLoading(true);
            try {
                const data = await getMovieDetails(id);
                const trailer = await getMovieTrailer(id);
                setMovie(data);
                if (trailer) setTrailerKey(trailer.key);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovie();
        window.scrollTo(0, 0); 
    }, [id]);

    const handleFavorite = () => {
        if (favorite) removeFavorite(movie.id);
        else addFavorite(movie);
    };

    if (loading) return <div className="h-screen bg-slate-950 flex items-center justify-center text-white">Carregando detalhes...</div>;
    if (!movie) return <div className="h-screen bg-slate-950 flex items-center justify-center text-white">Filme não encontrado.</div>;

    return (
        <div className="min-h-screen bg-slate-950 text-white pb-20">
            
            <div className="relative w-full h-[60vh] lg:h-[70vh]">
                <div className="absolute inset-0">
                    <img 
                        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} 
                        alt={movie.title} 
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/40 to-transparent"></div>
                </div>

                <Link to="/" className="absolute top-24 left-4 z-50 flex items-center gap-2 text-slate-300 hover:text-yellow-500 transition-colors bg-black/30 p-2 rounded-full backdrop-blur-md">
                    <ArrowLeft className="w-6 h-6" />
                </Link>

                {/* --- CONTEÚDO PRINCIPAL --- */}
                <div className="absolute bottom-0 w-full px-4 pb-12 z-10">
                    <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-end">
                        
                        <div className="hidden md:block w-72 rounded-xl overflow-hidden shadow-2xl shadow-black/50 border border-slate-700 transform hover:scale-105 transition-transform duration-500">
                            <img 
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                                alt={movie.title} 
                                className="w-full h-auto"
                            />
                        </div>

                        <div className="flex-1 space-y-4 mb-4">
                            
                            <div className="flex flex-wrap gap-2">
                                {movie.genres.map(genre => (
                                    <span key={genre.id} className="px-3 py-1 bg-yellow-500/20 text-yellow-500 text-xs font-bold rounded-full border border-yellow-500/20 backdrop-blur-sm">
                                        {genre.name}
                                    </span>
                                ))}
                            </div>

                            <div>
                                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                                    {movie.title}
                                </h1>
                                {movie.tagline && (
                                    <p className="text-slate-400 text-lg italic mt-2 font-light">"{movie.tagline}"</p>
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-6 text-sm md:text-base font-medium text-slate-300">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5 text-slate-500" />
                                    <span>{movie.release_date?.split("-")[0]}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-slate-500" />
                                    <span>{movie.runtime ? formatRuntime(movie.runtime) : "N/A"}</span>
                                </div>
                                <div className="flex items-center gap-2 text-yellow-400">
                                    <Star className="w-5 h-5 fill-current" />
                                    <span className="text-lg font-bold">{movie.vote_average?.toFixed(1)}</span>
                                    <span className="text-slate-500 text-xs">({movie.vote_count} votos)</span>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <a href={`https://www.youtube.com/watch?v=${trailerKey}`} target="_blank">
                                    <button className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-slate-950 font-bold px-8 py-3 rounded-xl transition-colors shadow-lg shadow-yellow-500/20">
                                        <Play className="w-5 h-5 fill-current" />
                                        Assistir Trailer
                                    </button>
                                </a>
                                
                                <button 
                                    onClick={handleFavorite}
                                    className={`
                                        flex items-center gap-2 px-6 py-3 rounded-xl border transition-all font-semibold
                                        ${favorite 
                                            ? "bg-slate-800 text-yellow-400 border-yellow-500/50 hover:bg-slate-700" 
                                            : "bg-slate-800/50 text-white border-white/10 hover:bg-slate-700 backdrop-blur-md"
                                        }
                                    `}
                                >
                                    <Star className="w-5 h-5" fill={favorite ? "currentColor" : "none"}/>
                                    {favorite ? "Favoritado" : "Adicionar aos Favoritos"}
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            {/* --- DETALHES --- */}
            <div className="max-w-7xl mx-auto px-4 mt-12 grid grid-cols-1 md:grid-cols-3 gap-12">
                
                <div className="md:col-span-2 space-y-8">
                    <section>
                        <h2 className="text-2xl font-bold text-white mb-4 border-l-4 border-yellow-500 pl-4">Sinopse</h2>
                        <p className="text-slate-300 text-lg leading-relaxed text-justify">
                            {movie.overview || "Nenhuma sinopse disponível para este filme."}
                        </p>
                    </section>
                </div>

                <div className="space-y-8">
                    <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">
                        <h3 className="text-lg font-bold text-white mb-4">Informações</h3>
                        <div className="space-y-4">
                            <div>
                                <span className="block text-slate-500 text-sm mb-1">Título Original</span>
                                <span className="text-slate-200 font-medium">{movie.original_title}</span>
                            </div>
                            <div>
                                <span className="block text-slate-500 text-sm mb-1">Orçamento</span>
                                <span className="text-green-400 font-medium">{movie.budget > 0 ? formatCurrency(movie.budget) : "Não informado"}</span>
                            </div>
                            <div>
                                <span className="block text-slate-500 text-sm mb-1">Receita</span>
                                <span className="text-green-400 font-medium">{movie.revenue > 0 ? formatCurrency(movie.revenue) : "Não informado"}</span>
                            </div>
                            <div>
                                <span className="block text-slate-500 text-sm mb-1">Status</span>
                                <span className="px-3 py-1 bg-slate-800 rounded-full text-xs border border-slate-700 inline-block">
                                    {movie.status}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default MoviePage;