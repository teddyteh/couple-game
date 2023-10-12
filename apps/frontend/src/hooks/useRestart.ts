import { Question } from "@/types/question";
import { fetchQuestions } from "@/utils/question";
import { useContext } from "react";
import { GameContext } from "./context";

export const useRestart = () => {
  const {
    setLoadingText,
    setCurrentQuestionIndex,
    setSelectedOption,
    setSelectedAnswers,
    setPartnerAnswers,
    setIsPlayerFinished,
    setIsPartnerFinished,
    setIsGameStarted,
    setQuestions,
    category,
    conn,
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
