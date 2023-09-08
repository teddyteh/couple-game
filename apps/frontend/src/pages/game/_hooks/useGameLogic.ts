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

    setTimeLeft(10);
    const timerId = setInterval(() => {
      setTimeLeft((prevTimeLeft) => {
        if (prevTimeLeft <= 1) {
          clearInterval(timerId);

          if (selectedOption === null) {
            const randomOption =
              questions[currentQuestionIndex].options[
                Math.floor(
                  Math.random() * questions[currentQuestionIndex].options.length
                )
              ];
            setSelectedOption(randomOption);
          }

          return 0;
        }
        return prevTimeLeft - 1;
      });
    }, 1000);

    return () => clearInterval(timerId);
  }, [isGameStarted, currentQuestionIndex]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextButtonClick();
    }
  }, [timeLeft]);

  const handleAnswerSelection = (answer: string) => setSelectedOption(answer);

  const handleNextButtonClick = () => {
    if (!selectedOption) return;

    // Save answers
    let newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = selectedOption;
    setSelectedAnswers(newAnswers);
    if (conn) conn.send({ answers: newAnswers });

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
    handleNextButtonClick,
  };
};
