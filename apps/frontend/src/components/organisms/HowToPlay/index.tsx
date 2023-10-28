import { Button } from "@/components/atoms/Button";
import { Share } from "@/components/molecules/Share";
import { TitleBar } from "@/components/molecules/TitleBar";
import { Question } from "@/components/organisms/Question";
import { Result } from "@/components/organisms/Result";
import { useMenu } from "@/hooks/useMenu";
import styles from "./styles.module.css";

type Payload = Pick<ReturnType<typeof useMenu>, "toggleShowHowToPlay">;

export const HowToPlay = ({ toggleShowHowToPlay }: Payload) => {
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
    <div className={styles.container}>
      <TitleBar onClick={toggleShowHowToPlay} title="How to Play" />

      <ul className={styles.list}>
        <li>
          <p>1. Click on Create Game</p>
          <div className={styles.step}>
            <Button>Create Game</Button>
          </div>
        </li>
        <li>
          <p>2. Share the link</p>
          <div className={styles.step}>
            <Share
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
          <div className={`${styles.step} ${styles.bordered}`}>
            <Question
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
          <div className={`${styles.step} ${styles.bordered}`}>
            <Result
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
