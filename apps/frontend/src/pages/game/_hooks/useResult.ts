import { useContext } from "react";
import { GameContext } from "./context";
import { useInitialization } from "./useInitialization";

export const useResult = ({
  initializePeerConnection,
  fetchQuestionsFromURL,
}: ReturnType<typeof useInitialization>) => {
  const {
    selectedAnswers,
    partnerAnswers,
    questions,
    setGameId,
    setConn,
    setIsGameStarted,
    setCurrentQuestionIndex,
    setSelectedOption,
    setSelectedAnswers,
    setPartnerAnswers,
    setIsPlayerFinished,
    setIsPartnerFinished,
  } = useContext(GameContext);

  const _calculateResults = () => {
    let matchCount = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer && partnerAnswers[index] && answer === partnerAnswers[index]) {
        matchCount += 1;
      }
    });
    return { matchCount, total: questions.length };
  };

  const calculateCompatibilityScore = () => {
    const results = _calculateResults();
    return ((results.matchCount / results.total) * 100).toFixed(0);
  };

  const generateResultDetails = () => {
    let resultDetails: {
      question: string;
      yourAnswer: string;
      partnerAnswer: string;
    }[] = [];
    selectedAnswers.forEach((answer, index) => {
      if (answer && partnerAnswers[index] && answer !== partnerAnswers[index]) {
        resultDetails.push({
          question: questions[index].question,
          yourAnswer: answer,
          partnerAnswer: partnerAnswers[index],
        });
      }
    });
    return resultDetails;
  };

  const restartGame = () => {
    setGameId(null);
    setConn(null);
    setIsGameStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setSelectedAnswers([]);
    setPartnerAnswers([]);
    setIsPlayerFinished(false);
    setIsPartnerFinished(false);
    // Fetch new questions or reset to initial set of questions
    fetchQuestionsFromURL();
    // Re-initialize peer connection
    initializePeerConnection();
  };

  return {
    calculateCompatibilityScore,
    generateResultDetails,
    restartGame
  };
};
