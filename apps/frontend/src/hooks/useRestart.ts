import { Question } from "@/types/question";
import { fetchQuestions } from "@/utils/question";
import { useContext } from "react";
import { GameContext } from "./context";

export const useRestart = () => {
  const {
    category,
    conn,
    setCurrentQuestionIndex,
    setIsGameStarted,
    setIsPartnerFinished,
    setIsPlayerFinished,
    setLoadingText,
    setPartnerAnswers,
    setQuestions,
    setSelectedAnswers,
    setSelectedOption,
} = useContext(GameContext);

  const resetGameState = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setSelectedAnswers([]);
    setPartnerAnswers([]);
    setIsPlayerFinished(false);
    setIsPartnerFinished(false);
  };

  const restartGame = async (questions?: Question[]) => {
    setLoadingText("Restarting game...");

    const newQuestions = questions ?? (await fetchQuestions(category));
    setQuestions(newQuestions);

    conn?.send({
      type: "restart",
      questions: newQuestions,
      category,
    });

    resetGameState();

    setLoadingText(null);

    setIsGameStarted(true);
  };

  return {
    resetGameState,
    restartGame,
  };
};
