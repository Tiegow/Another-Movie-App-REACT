import { Link } from "react-router-dom";
import { Film } from "lucide-react"; 

function NavBar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link 
                            to="/" 
                            className="flex items-center gap-2 text-2xl font-bold text-white tracking-tighter hover:opacity-90 transition-opacity"
                        >
                            <Film className="w-6 h-6 text-yellow-500" />
                            
                            <span>
                                Movie<span className="text-yellow-500">App</span>
                            </span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-6">
                        <Link 
                            to="/" 
                            className="text-slate-300 hover:text-white text-sm font-medium transition-colors duration-200"
                        >
                            Início
                        </Link>
                        
                        <Link 
                            to="/favoritos" 
                            className="text-slate-300 hover:text-yellow-500 text-sm font-medium transition-colors duration-200"
                        >
                            Favoritos
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;