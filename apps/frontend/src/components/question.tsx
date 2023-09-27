import { GameContextType } from "@/hooks/context";
import { Question } from "@/types/question";
import { useGameLogic } from "../hooks/useGameLogic";
import { FooterComponent } from "./footer";

type Payload = {
  questionsLength: number;
  currentQuestionIndex: GameContextType["currentQuestionIndex"];
  timeLeft: GameContextType["timeLeft"];
  currentQuestion: Question;
  selectedOption: string | null;
  handleAnswerSelection: ReturnType<
    typeof useGameLogic
  >["handleAnswerSelection"];
};

export const QuestionComponent = ({
  currentQuestionIndex,
  questionsLength,
  timeLeft,
  currentQuestion,
  selectedOption,
  handleAnswerSelection,
}: Payload) => {
  return (
    <div className="screen-section quiz-screen">
      <div className="quiz-screen-step">
        Round <span>{currentQuestionIndex + 1}</span> out of
        {" " + questionsLength}
      </div>
      <div className="quiz-image-wrapper">
        <img
          className="quiz-image"
          src="https://wapu.us/wp-content/uploads/2019/03/Friedensreiter-Couple-WCOS-540x513.png"
          alt=""
        />
      </div>
      <div className="quiz-timer">
        <span
          style={{ animationPlayState: timeLeft !== 0 ? "running" : "paused" }}
        />
      </div>
      <div className="quiz-question">{currentQuestion.question}</div>
      <div className="button-container">
        {currentQuestion.options.map((option, index) => (
          <div key={option} className="button-outer w-full">
            <button
              id={`answer${index}`}
              className="default-button"
              onClick={() => handleAnswerSelection(option)}
            >
              {option}
            </button>
          </div>
        ))}
      </div>
      <FooterComponent />
    </div>
  );
};
