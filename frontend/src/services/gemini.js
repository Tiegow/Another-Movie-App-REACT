import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8080";

export const generateMovieQuestion = async (movieTitle) => {
    try {
        const response = await axios.post(`${BACKEND_URL}/api/quiz/question`, {
            movieTitle,
        });
        return response.data.question;
    } catch (error) {
        console.error("Erro ao gerar pergunta:", error.message);
        throw error;
    }
};
