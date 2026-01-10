import { Star } from 'lucide-react';
import { useMovieContext } from '../contexts/MovieContext';
import { Link } from "react-router-dom";

function MovieCard({ movie }) {

    const {isFavorite, addFavorite, removeFavorite} = useMovieContext();
    const favorite = isFavorite(movie.id);

    function onFavorite(e) {
        e.preventDefault();
        
        favorite ? removeFavorite(movie.id) : addFavorite(movie);
    }

    return (
        <div className="group relative bg-slate-900 rounded-xl overflow-hidden shadow-lg border border-slate-800 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-yellow-500/10 cursor-pointer">
            
            {/* Imagem */}
            <div className="relative aspect-[2/3] w-full overflow-hidden">
                <Link to={`/movie/${movie.id}`}>
                    <img 
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
                        alt={movie.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                </Link>
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4">
                    
                    <div className="flex justify-end">
                        <button 
                            className={`
                                p-2 rounded-full border transition-all transform hover:scale-110
                                ${favorite 
                                    ? "bg-slate-900/80 text-yellow-400 border-yellow-500/50" 
                                    : "bg-slate-900/60 text-white border-white/10 hover:text-yellow-400" 
                                }
                            `}                            
                            onClick={onFavorite}
                        >
                            <Star className="w-5 h-5" fill={favorite ? "currentColor" : "none"}/>
                        </button>
                    </div>

                    <Link to={`/movie/${movie.id}`} className="text-yellow-400 text-xs font-bold uppercase tracking-wider">
                        Ver detalhes
                    </Link>
                </div>
            </div>

            {/* Informações */}
            <div className="p-4 bg-slate-900">
                <h3 className="text-lg font-bold text-white truncate group-hover:text-yellow-500 transition-colors">
                    {movie.title}
                </h3>
                <div className="flex justify-between items-center mt-2">
                    <p className="text-slate-400 text-sm font-medium">
                        {movie.release_date?.split("-")[0]}
                    </p>

                    <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <Star className="w-3 h-3 fill-current" />
                        <span>{movie.vote_average?.toFixed(1)}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MovieCard;