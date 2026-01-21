import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom"; 
import { HeartOff } from 'lucide-react'; 

function Favorites() {

    const { favorites } = useMovieContext();

    const hasFavorites = favorites && favorites.length > 0;

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-10 px-4">
            <div className="max-w-7xl mx-auto">
                
                <h1 className="text-3xl font-bold text-white mb-8 text-center sm:text-left border-b border-slate-800 pb-4">
                    Meus Favoritos
                </h1>

                {hasFavorites ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {favorites.map(movie => (
                            <MovieCard movie={movie} key={movie.id} />
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 text-center bg-slate-900/50 rounded-2xl border border-slate-800 border-dashed">
                        
                        <div className="bg-slate-800 p-6 rounded-full mb-6">
                            <HeartOff className="w-16 h-16 text-slate-600" />
                        </div>

                        <h2 className="text-2xl font-bold text-white mb-2">
                            Sua lista está vazia
                        </h2>
                        
                        <p className="text-slate-400 mb-8 max-w-md">
                            Você ainda não salvou nenhum filme. Explore o catálogo e marque seus preferidos para vê-los aqui.
                        </p>

                        <Link 
                            to="/" 
                            className="bg-yellow-500 hover:bg-yellow-600 text-slate-950 font-bold py-3 px-8 rounded-full transition-colors duration-200 shadow-lg shadow-yellow-500/20"
                        >
                            Explorar Filmes
                        </Link>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Favorites;