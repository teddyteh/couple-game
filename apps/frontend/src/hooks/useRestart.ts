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

  const restartGame = async () => {
    resetGameState();

    if (conn) {
      conn.send({ restart: true });
    }
  };

  return {
    resetGameState,
    restartGame,
  };
};
