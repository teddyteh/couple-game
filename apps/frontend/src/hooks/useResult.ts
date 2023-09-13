import { useContext } from "react";
import { GameContext } from "./context";

export const useResult = () => {
  const { selectedAnswers, partnerAnswers, questions } =
    useContext(GameContext);

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
    return {
      matches: results.matchCount,
      total: results.total,
      percentage: ((results.matchCount / results.total) * 100).toFixed(0),
    };
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

  return {
    calculateCompatibilityScore,
    generateResultDetails,
  };
};
