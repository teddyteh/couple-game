import { useContext } from "react";
import { GameContext } from "./context";
import { fetchQuestionsFromURL } from "@/utils/question";
import { Question } from "@/types/question";

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
    resetGameState();
    questions && setQuestions(questions); // For the other player

    // Player who initiaties the restart
    if (conn) {
      // Reset questions
      const questions = await fetchQuestionsFromURL(category);
      setQuestions(questions);

      conn.send({ restart: true, questions });
    }
  };

  return {
    resetGameState,
    restartGame,
  };
};
