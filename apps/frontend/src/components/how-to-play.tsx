import { useMenu } from "@/hooks/useMenu";
import { QuestionComponent } from "./question";
import { ResultComponent } from "./result";
import { ShareComponent } from "./share";
import { TitleBar } from "./title-bar";

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
    details: {
      correct: [],
      wrong: [
        {
          question: randomQuestion.question,
          yourAnswer: randomQuestion.options[0],
          partnerAnswer: randomQuestion.options[2],
        },
      ],
    },
  };

  return (
    <div className="how-to-play-container">
      <TitleBar onClick={toggleShowHowToPlay} title="How to Play" />

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
              copyShareLink={async () => {}}
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
              advice={{
                shortSummary:
                  "Overall, you and your partner seem to have a strong compatibility based on effective communication and problem-solving skills. However, it may be beneficial to focus on nurturing your emotional connection and ensuring that you both are on the same page when it comes to future goals.",
                suggestions: [
                  "1. Make time for regular check-ins to discuss your relationship, including both strengths and areas for improvement.",
                  "2. Try incorporating new activities or hobbies into your routine to keep things fresh and exciting.",
                  "3. It may also be helpful to discuss and set clear goals and expectations for your future as a couple.",
                ],
              }}
              enableAdviser={false}
              getAdvice={async () => {}}
              resultDetails={result.details}
              restartGame={async () => {}}
              score={result.score}
            />
          </div>
        </li>
      </ul>
    </div>
  );
};
