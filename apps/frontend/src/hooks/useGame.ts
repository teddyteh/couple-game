import { GameContext } from "@/contexts/game";
import { useContext, useEffect } from "react";

export const useGame = () => {
  const {
    conn,
    currentQuestionIndex,
    isGameStarted,
    isPlayerFinished,
    questions,
    selectedAnswers,
    selectedOption,
    setCurrentQuestionIndex,
    setSelectedAnswers,
    setSelectedOption,
    setIsPlayerFinished,
    timeLeft,
    setTimeLeft,
} = useContext(GameContext);

  useEffect(() => {
    if (!isGameStarted || isPlayerFinished) {
      return;
    }

    // Only reset the timer if the game hasn't ended
    if (!(isPlayerFinished && currentQuestionIndex === questions.length - 1)) {
      setTimeLeft(30); // Should match animation-duration
    }

    const timerId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(timerId);

          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [isGameStarted, currentQuestionIndex, isPlayerFinished]);

  useEffect(() => {
    if (timeLeft === 0) {
      // Select a random option if the player hasn't selected one
      if (selectedOption === null) {
        const randomOption =
          questions[currentQuestionIndex].options[
            Math.floor(
              Math.random() * questions[currentQuestionIndex].options.length
            )
          ];
        setSelectedOption(randomOption);
      }

      goToNextQuestion();
    }
  }, [timeLeft, selectedOption]);

  const handleAnswerSelection = (answer: string) => {
    setSelectedOption(answer);

    // Save answers
    let newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newAnswers);
    conn?.send({ type: "answers", answers: newAnswers });

    goToNextQuestion();
  };

  const goToNextQuestion = () => {
    // Go to next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
    } else {
      // No more questions
      setIsPlayerFinished(true);
      conn?.send({ type: "finished", finished: true });
    }
  };

  return {
    handleAnswerSelection,
  };
};
