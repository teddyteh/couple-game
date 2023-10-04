import { GameContextType } from "@/hooks/context";
import { useGame } from "@/hooks/useGame";
import { Question } from "@/types/question";

type Payload = {
  questionsLength: number;
  currentQuestionIndex: GameContextType["currentQuestionIndex"];
  timeLeft: GameContextType["timeLeft"];
  currentQuestion: Question;
  selectedOption: string | null;
  handleAnswerSelection: ReturnType<typeof useGame>["handleAnswerSelection"];
};

export const QuestionComponent = ({
  currentQuestionIndex,
  questionsLength,
  timeLeft,
  currentQuestion,
  handleAnswerSelection,
}: Payload) => {
  return (
    <>
      <div className="quiz-screen-step">
        Question <span>{currentQuestionIndex + 1}</span> out of{" "}
        {questionsLength}
      </div>
      <div className="image-wrapper">
        <img
          className="image"
          src="https://wapu.us/wp-content/uploads/2019/03/Friedensreiter-Couple-WCOS-540x513.png"
          alt=""
        />
      </div>
      <div className="quiz-timer-container">
        <span
          className="quiz-timer-bar"
          key={currentQuestionIndex}
          style={{ animationPlayState: timeLeft !== 0 ? "running" : "paused" }}
        />
      </div>
      <div className="quiz-question">{currentQuestion.question}</div>
      <div className="button-container">
        {currentQuestion.options.map((option, index) => (
          <div key={option} className="button-outer">
            <button
              id={`answer${index}`}
              className="question-selection-button"
              onClick={() => handleAnswerSelection(option)}
            >
              {option}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
