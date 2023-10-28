import { GameContext } from "@/contexts/game";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { fetchAdvice } from "@/utils/advice";
import { useContext } from "react";

export interface ResultDetail {
  question: string;
  yourAnswer: string;
  partnerAnswer: string;
}

export const useResult = () => {
  const {
    conn,
    partnerAnswers,
    questions,
    selectedAnswers,
    setAdvice,
    setLoadingText,
  } = useContext(GameContext);
  const [adviceFetchCount, setAdviceFetchCount] = useSessionStorage(
    "adviceFetchCount",
    0
  );

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

  const getAdvice = async () => {
    setLoadingText("Getting advice...");

    const answers = questions.map((questionItem, index) => {
      return {
        question: questionItem.question,
        player1Answer: selectedAnswers[index],
        player2Answer: partnerAnswers[index],
      };
    });
    const advice = await fetchAdvice({ answers });

    if (advice) {
      setAdvice(advice);
      setAdviceFetchCount(adviceFetchCount + 1);
      conn?.send({ type: "advice", advice });
    }
    setLoadingText(null);
  };

  return {
    calculateCompatibilityScore,
    generateResultDetails,
    getAdvice,
  };
};
