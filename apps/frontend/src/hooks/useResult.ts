import { useContext } from "react";
import { GameContext } from "./context";

export interface ResultDetail {
  question: string;
  yourAnswer: string;
  partnerAnswer: string;
}

export const useResult = () => {
  const { partnerAnswers, questions, selectedAnswers } =
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
    return selectedAnswers.reduce<{
      correct: ResultDetail[];
      wrong: ResultDetail[];
    }>(
      (acc, answer, index) => {
        const detail = {
          question: questions[index].question,
          yourAnswer: answer,
          partnerAnswer: partnerAnswers[index],
        };

        if (
          answer &&
          partnerAnswers[index] &&
          answer !== partnerAnswers[index]
        ) {
          acc.wrong.push(detail);
        } else {
          acc.correct.push(detail);
        }

        return acc;
      },
      {
        correct: [],
        wrong: [],
      }
    );
  };

  return {
    calculateCompatibilityScore,
    generateResultDetails,
  };
};
