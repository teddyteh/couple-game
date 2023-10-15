import { useMenu } from "@/hooks/useMenu";
import { QuestionComponent } from "./question";
import { ResultComponent } from "./result";
import { ShareComponent } from "./share";

type Payload = Pick<ReturnType<typeof useMenu>, "toggleShowHowToPlay">;

export const HowToPlayComponent = ({ toggleShowHowToPlay }: Payload) => {
  const randomShareLink = `${window.location.origin}/game/${Math.random()
    .toString(36)
    .substring(2, 15)}`;

  const randomQuestion = {
    question: "What is your preferred love language?",
    options: [
      "Words of Affirmation",
      "Acts of Service",
      "Receiving Gifts",
      "Quality Time",
    ],
  };

  const result = {
    score: { matches: 4, total: 5, percentage: "80" },
    details: [
      {
        question: randomQuestion.question,
        yourAnswer: randomQuestion.options[0],
        partnerAnswer: randomQuestion.options[2],
      },
    ],
  };

  return (
    <div className="how-to-play-container">
      <div className="title-bar">
        <button className="transparent-button" onClick={toggleShowHowToPlay}>
          <i className="fas fa-arrow-left back-icon"></i>
        </button>
        <h1>How to Play</h1>
      </div>

      <ul className="list">
        <li>
          <p>1. Click on Create Game</p>
          <div className="step">
            <button className="default-button">Create Game</button>
          </div>
        </li>
        <li>
          <p>2. Share the link</p>
          <div className="step">
            <ShareComponent
              shareLink={randomShareLink}
              hasCopiedShareLink
              setHasCopiedShareLink={() => {}}
              copyShareLink={() => {}}
              shouldShowStore={false}
            />
          </div>
        </li>
        <li>
          <p>3. Play the game</p>
          <div className="step bordered">
            <QuestionComponent
              questionsLength={5}
              currentQuestionIndex={0}
              timeLeft={10}
              currentQuestion={randomQuestion}
              selectedOption={null}
              handleAnswerSelection={() => {}}
            />
          </div>
        </li>
        <li>
          <p>4. Compare your answers!</p>
          <div className="step bordered">
            <ResultComponent
              score={result.score}
              resultDetails={result.details}
              restartGame={async () => {}}
            />
          </div>
        </li>
      </ul>
    </div>
  );
};
