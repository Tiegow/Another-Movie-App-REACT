import { useState } from "react";
import { getPopular } from "../services/api";
import { generateMovieQuestion } from "../services/gemini";
import { Brain, Loader2, CheckCircle2, XCircle, RotateCcw, Sparkles, Trophy, Film } from "lucide-react";

function Quiz() {
    const [gameState, setGameState] = useState("idle"); 
    const [options, setOptions] = useState([]);
    const [correctMovie, setCorrectMovie] = useState(null);
    const [question, setQuestion] = useState("");
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isCorrect, setIsCorrect] = useState(false);
    const [score, setScore] = useState({ correct: 0, total: 0 });
    const [error, setError] = useState(null);

    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    const startQuiz = async () => {
        setGameState("loading");
        setError(null);
        setSelectedMovie(null);

        try {
            const popularMovies = await getPopular();
            const shuffled = shuffleArray(popularMovies);
            const fourMovies = shuffled.slice(0, 4);
            const correct = fourMovies[Math.floor(Math.random() * 4)];

            const generatedQuestion = await generateMovieQuestion(correct.title);

            setOptions(fourMovies);
            setCorrectMovie(correct);
            setQuestion(generatedQuestion);
            setGameState("playing");
        } catch (err) {
            console.error(err);
            setError("Falha ao carregar o quiz. Verifique sua conexão e a chave da API Gemini.");
            setGameState("idle");
        }
    };

    const handleAnswer = (movie) => {
        if (selectedMovie) return;

        setSelectedMovie(movie);
        const correct = movie.id === correctMovie.id;
        setIsCorrect(correct);
        setScore(prev => ({
            correct: prev.correct + (correct ? 1 : 0),
            total: prev.total + 1
        }));
        setGameState("result");
    };

    const getCardStyle = (movie) => {
        if (gameState !== "result") {
            return "border-slate-700 hover:border-yellow-500/70 hover:shadow-lg hover:shadow-yellow-500/10 hover:-translate-y-2";
        }

        if (movie.id === correctMovie.id) {
            return "border-emerald-500 shadow-lg shadow-emerald-500/20 ring-2 ring-emerald-500/50 scale-[1.03]";
        }

        if (movie.id === selectedMovie?.id && !isCorrect) {
            return "border-red-500 shadow-lg shadow-red-500/20 ring-2 ring-red-500/50 opacity-80";
        }

        return "border-slate-700 opacity-50";
    };

    return (
        <div className="min-h-screen bg-slate-950 pt-24 pb-10 px-4">
            <div className="max-w-4xl mx-auto">

                {/* Header */}
                <div className="text-center mb-10">
                    <div className="flex items-center justify-center gap-3 mb-3">
                        <Brain className="w-8 h-8 text-yellow-500" />
                        <h1 className="text-4xl font-bold text-white">
                            Quiz <span className="text-yellow-500">Cinéfilo</span>
                        </h1>
                    </div>
                    <p className="text-slate-400 text-lg">
                        A IA gera uma pista — você adivinha o filme!
                    </p>

                    {score.total > 0 && (
                        <div className="mt-4 inline-flex items-center gap-2 bg-slate-800/60 border border-slate-700 px-4 py-2 rounded-full">
                            <Trophy className="w-4 h-4 text-yellow-500" />
                            <span className="text-slate-300 text-sm font-medium">
                                {score.correct}/{score.total} acertos
                            </span>
                        </div>
                    )}
                </div>

                {/* Idle State */}
                {gameState === "idle" && (
                    <div className="flex flex-col items-center gap-6 py-16">
                        <div className="relative">
                            <div className="w-32 h-32 bg-gradient-to-br from-yellow-500/20 to-amber-600/20 rounded-full flex items-center justify-center border border-yellow-500/30">
                                <Film className="w-16 h-16 text-yellow-500" />
                            </div>
                            <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
                        </div>

                        <div className="text-center max-w-md">
                            <h2 className="text-2xl font-bold text-white mb-3">
                                Teste seus conhecimentos!
                            </h2>
                            <p className="text-slate-400">
                                A inteligência artificial vai gerar uma pergunta ou curiosidade sobre um filme.
                                Sua missão é descobrir qual dos 4 filmes é o correto!
                            </p>
                        </div>

                        {error && (
                            <div className="bg-red-500/10 border border-red-500/30 rounded-xl px-6 py-3 text-red-400 text-sm max-w-md text-center">
                                {error}
                            </div>
                        )}

                        <button
                            onClick={startQuiz}
                            className="group flex items-center gap-3 bg-yellow-500 hover:bg-yellow-400 text-slate-950 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/30 hover:scale-105"
                        >
                            <Sparkles className="w-5 h-5 group-hover:animate-spin" />
                            Iniciar Quiz
                        </button>
                    </div>
                )}

                {/* Loading State */}
                {gameState === "loading" && (
                    <div className="flex flex-col items-center gap-6 py-20">
                        <div className="relative">
                            <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
                                <Loader2 className="w-12 h-12 text-yellow-500 animate-spin" />
                            </div>
                        </div>
                        <div className="text-center">
                            <h3 className="text-xl font-bold text-white mb-2">
                                Gerando pergunta...
                            </h3>
                            <p className="text-slate-400 text-sm">
                                A IA está preparando uma pergunta especial para você!
                            </p>
                        </div>
                        <div className="flex gap-1">
                            {[0, 1, 2].map(i => (
                                <div
                                    key={i}
                                    className="w-3 h-3 bg-yellow-500 rounded-full animate-bounce"
                                    style={{ animationDelay: `${i * 0.15}s` }}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Playing & Result States */}
                {(gameState === "playing" || gameState === "result") && (
                    <div className="flex flex-col gap-8">

                        {/* Question Card */}
                        <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700 rounded-2xl p-6 md:p-8 backdrop-blur-sm">
                            <div className="flex items-start gap-3">
                                <div className="bg-yellow-500/10 p-2 rounded-lg border border-yellow-500/30 shrink-0">
                                    <Brain className="w-5 h-5 text-yellow-500" />
                                </div>
                                <p className="text-white text-lg md:text-xl font-medium leading-relaxed">
                                    {question}
                                </p>
                            </div>
                        </div>

                        {/* Movie Options */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {options.map((movie) => (
                                <button
                                    key={movie.id}
                                    onClick={() => handleAnswer(movie)}
                                    disabled={gameState === "result"}
                                    className={`
                                        group relative bg-slate-900 rounded-xl overflow-hidden border-2 
                                        transition-all duration-300 cursor-pointer text-left
                                        ${getCardStyle(movie)}
                                    `}
                                >
                                    {/* Poster */}
                                    <div className="relative aspect-[2/3] w-full overflow-hidden">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            alt={movie.title}
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />

                                        {/* Result overlay icons */}
                                        {gameState === "result" && movie.id === correctMovie.id && (
                                            <div className="absolute inset-0 bg-emerald-500/20 flex items-center justify-center">
                                                <div className="bg-emerald-500 p-3 rounded-full shadow-lg">
                                                    <CheckCircle2 className="w-8 h-8 text-white" />
                                                </div>
                                            </div>
                                        )}

                                        {gameState === "result" && movie.id === selectedMovie?.id && !isCorrect && (
                                            <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
                                                <div className="bg-red-500 p-3 rounded-full shadow-lg">
                                                    <XCircle className="w-8 h-8 text-white" />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Title */}
                                    <div className="p-3">
                                        <h3 className="text-sm font-bold text-white truncate group-hover:text-yellow-500 transition-colors">
                                            {movie.title}
                                        </h3>
                                        <p className="text-slate-500 text-xs mt-1">
                                            {movie.release_date?.split("-")[0]}
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>

                        {/* Result Feedback */}
                        {gameState === "result" && (
                            <div className={`
                                rounded-2xl p-6 text-center border-2 transition-all duration-500
                                ${isCorrect
                                    ? "bg-emerald-500/10 border-emerald-500/30"
                                    : "bg-red-500/10 border-red-500/30"
                                }
                            `}>
                                {isCorrect ? (
                                    <div className="flex flex-col items-center gap-3">
                                        <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                                        <h3 className="text-2xl font-bold text-emerald-400">
                                            Parabéns! 🎉
                                        </h3>
                                        <p className="text-slate-300">
                                            Você acertou! O filme era <strong className="text-white">{correctMovie.title}</strong>.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center gap-3">
                                        <XCircle className="w-12 h-12 text-red-500" />
                                        <h3 className="text-2xl font-bold text-red-400">
                                            Quase lá! 😅
                                        </h3>
                                        <p className="text-slate-300">
                                            A resposta correta era <strong className="text-white">{correctMovie.title}</strong>.
                                        </p>
                                    </div>
                                )}

                                <button
                                    onClick={startQuiz}
                                    className="mt-6 inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-slate-950 px-6 py-3 rounded-xl font-bold transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/30 hover:scale-105"
                                >
                                    <RotateCcw className="w-5 h-5" />
                                    Jogar Novamente
                                </button>
                            </div>
                        )}
                    </div>
                )}

            </div>
        </div>
    );
}

export default Quiz;
