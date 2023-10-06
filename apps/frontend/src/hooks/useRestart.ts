import { Question } from "@/types/question";
import { fetchQuestionsFromURL } from "@/utils/question";
import { useContext } from "react";
import { GameContext } from "./context";

export const useRestart = () => {
  const {
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
    setIsGameStarted(true);
  };

  const restartGame = async (questions?: Question[]) => {
    const newQuestions = questions ?? (await fetchQuestionsFromURL(category));
    setQuestions(newQuestions);

    conn?.send({ restart: true, questions: newQuestions });

    resetGameState();
  };

  return {
    resetGameState,
    restartGame,
  };
};
