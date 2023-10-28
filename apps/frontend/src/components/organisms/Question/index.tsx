import { GameContextType } from "@/hooks/context";
import { useGame } from "@/hooks/useGame";
import { Question as QuestionType } from "@/types/question";
import { useEffect, useRef, useState } from "react";

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
    <div className="question-container">
      <div className="title">
        Question <span>{currentQuestionIndex + 1}</span> out of{" "}
        {questionsLength}
      </div>
      <div className="quiz-timer-container">
        <span
          className="progress-bar"
          key={currentQuestionIndex}
          style={{ animationPlayState: timeLeft !== 0 ? "running" : "paused" }}
        />
      </div>
      <div className="question">{currentQuestion.question}</div>
      <div className="button-container">
        {currentQuestion.options.map((option, index) => (
          <div key={option} className="button-outer">
            <button
              id={`answer${index}`}
              className="default-button"
              onClick={() => handleAnswerSelection(option)}
            >
              <div
                className={`text ${shouldAnimate[index] ? "scrolling" : ""}`}
                ref={(el) => (textRef.current[index] = el)}
              >
                {option}
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
