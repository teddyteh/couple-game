import { useContext } from "react";
import { GameContext } from "./context";
import { useInitialization } from "./useInitialization";

type Payload = Pick<
  ReturnType<typeof useInitialization>,
  "fetchQuestionsFromURL"
>;

export const useRestart = ({ fetchQuestionsFromURL }: Payload) => {
  const {
    conn,
    setIsGameStarted,
    setCurrentQuestionIndex,
    setSelectedOption,
    setSelectedAnswers,
    setPartnerAnswers,
    setIsPlayerFinished,
    setIsPartnerFinished,
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

  const restartGame = () => {
    _resetGameState();

    fetchQuestionsFromURL();

    if (conn) {
      conn.send({ restart: true });
    }
  };

  return {
    restartGame,
  };
};
