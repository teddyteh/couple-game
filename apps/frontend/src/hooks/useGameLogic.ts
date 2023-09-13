import { useContext, useEffect } from "react";
import { GameContext } from "./context";

export const useGameLogic = () => {
  const {
    conn,
    questions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    selectedAnswers,
    setSelectedAnswers,
    isGameStarted,
    isPlayerFinished,
    setIsPlayerFinished,
    selectedOption,
    setSelectedOption,
    timeLeft,
    setTimeLeft,
  } = useContext(GameContext);

  useEffect(() => {
    if (!isGameStarted || isPlayerFinished) {
      return;
    }

    // Only reset the timer if the game hasn't ended
    if (!(isPlayerFinished && currentQuestionIndex === questions.length - 1)) {
      setTimeLeft(10);
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
    if (conn) conn.send({ answers: newAnswers });

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
      if (conn) conn.send({ finished: true });
    }
  };

  return {
    handleAnswerSelection,
  };
};
