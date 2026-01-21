import { Github, Linkedin, Mail, Heart, Film } from 'lucide-react';

function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-slate-800 pt-12 pb-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4">
                
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
                    
                    <div className="flex flex-col items-center md:items-start text-center md:text-left">
                        <div className="flex items-center gap-2 mb-2">
                            <Film className="w-6 h-6 text-yellow-500" />
                            <span className="text-xl font-bold text-white tracking-tighter">
                                Movie<span className="text-yellow-500">App</span>
                            </span>
                        </div>
                        <p className="text-slate-400 text-sm max-w-xs">
                            Sua fonte para explorar o universo do cinema. 
                            Dados fornecidos pela TMDB API.
                        </p>
                    </div>

                    <div className="flex gap-6">
                        <a 
                            href="https://github.com/Tiegow" 
                            target="_blank" 
                            className="group flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors"
                        >
                            <div className="p-2 bg-slate-900 rounded-full group-hover:bg-slate-800 transition-colors border border-slate-800 group-hover:border-yellow-500/50">
                                <Github className="w-5 h-5 group-hover:text-yellow-500 transition-colors" />
                            </div>
                            <span className="text-[10px] uppercase font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">Github</span>
                        </a>

                        <a 
                            href="https://linkedin.com/in/tiego-rocha" 
                            target="_blank" 
                            className="group flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors"
                        >
                            <div className="p-2 bg-slate-900 rounded-full group-hover:bg-slate-800 transition-colors border border-slate-800 group-hover:border-blue-500/50">
                                <Linkedin className="w-5 h-5 group-hover:text-blue-500 transition-colors" />
                            </div>
                            <span className="text-[10px] uppercase font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">LinkedIn</span>
                        </a>

                        <a 
                            href="mailto:tiegorafael@gmail.com" 
                            className="group flex flex-col items-center gap-1 text-slate-400 hover:text-white transition-colors"
                        >
                            <div className="p-2 bg-slate-900 rounded-full group-hover:bg-slate-800 transition-colors border border-slate-800 group-hover:border-red-500/50">
                                <Mail className="w-5 h-5 group-hover:text-red-500 transition-colors" />
                            </div>
                            <span className="text-[10px] uppercase font-bold tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">Email</span>
                        </a>
                    </div>
                </div>

                <div className="w-full h-px bg-slate-800 mb-8"></div>

                <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
                    <p>&copy; 2025 MovieApp.</p>
                    
                    <a href="https://www.instagram.com/ti_tiego/" target="_blank" className="flex items-center gap-1 mt-2 md:mt-0">
                        Desenvolvido com <Heart className="w-3 h-3 text-red-500 fill-current animate-pulse" /> por 
                        <span className="text-slate-300 font-medium hover:text-yellow-500 transition-colors cursor-pointer">
                            Tiego Rocha
                        </span>
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;