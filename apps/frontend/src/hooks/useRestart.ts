import { useContext } from "react";
import { GameContext } from "./context";
import { fetchQuestionsFromURL } from "@/utils/question";

export const useRestart = () => {
  const {
    setCurrentQuestionIndex,
    setSelectedOption,
    setSelectedAnswers,
    setPartnerAnswers,
    setIsPlayerFinished,
    setIsPartnerFinished,
    setIsGameStarted,
    conn,
    setQuestions,
  } = useContext(GameContext);

  const _resetGameState = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setSelectedAnswers([]);
    setPartnerAnswers([]);
    setIsPlayerFinished(false);
    setIsPartnerFinished(false);
    setIsGameStarted(true);
  };

  const restartGame = async () => {
    _resetGameState();

    const questions = await fetchQuestionsFromURL();
    setQuestions(questions);

    if (conn) {
      conn.send({ restart: true });
    }
  };

  return {
    restartGame,
  };
};
