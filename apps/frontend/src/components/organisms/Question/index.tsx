import { Button } from "@/components/atoms/Button";
import { ButtonContainer } from "@/components/molecules/ButtonContainer";
import { GameContextType } from "@/contexts/game";
import { useGame } from "@/hooks/useGame";
import { Question as QuestionType } from "@/types/question";
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

type Payload = {
  questionsLength: number;
  currentQuestionIndex: GameContextType["currentQuestionIndex"];
  timeLeft: GameContextType["timeLeft"];
  currentQuestion: QuestionType;
  selectedOption: string | null;
  handleAnswerSelection: ReturnType<typeof useGame>["handleAnswerSelection"];
};

export const Question = ({
  currentQuestionIndex,
  questionsLength,
  timeLeft,
  currentQuestion,
  handleAnswerSelection,
}: Payload) => {
  const textRef = useRef<(HTMLDivElement | null)[]>([]);
  const [shouldAnimate, setShouldAnimate] = useState<(boolean | null)[]>([]);

  useEffect(() => {
    const animationStates = currentQuestion.options.map((_, index) => {
      const currentRef = textRef.current[index];
      return (
        currentRef &&
        currentRef.offsetWidth > currentRef.parentElement!.offsetWidth
      );
    });
    setShouldAnimate(animationStates);
  }, [currentQuestion]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Question <span>{currentQuestionIndex + 1}</span> out of{" "}
        {questionsLength}
      </div>
      <div className={styles.quizTimerContainer}>
        <span
          className={styles.progressBar}
          key={currentQuestionIndex}
          style={{ animationPlayState: timeLeft !== 0 ? "running" : "paused" }}
        />
      </div>
      <div className={styles.question}>{currentQuestion.question}</div>
      <ButtonContainer>
        {currentQuestion.options.map((option, index) => (
          <Button
            key={option}
            hasOuter
            // id={`answer${index}`}
            onClick={() => handleAnswerSelection(option)}
          >
            <div
              className={`text ${shouldAnimate[index] ? "scrolling" : ""}`}
              ref={(el) => (textRef.current[index] = el)}
            >
              {option}
            </div>
          </Button>
        ))}
      </ButtonContainer>
    </div>
  );
};
