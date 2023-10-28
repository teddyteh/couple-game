import { Button } from "@/components/atoms/Button";
import { Advice } from "@/components/molecules/Advice";
import { ButtonContainer } from "@/components/molecules/ButtonContainer";
import { GameContextType } from "@/contexts/game";
import { useRestart } from "@/hooks/useRestart";
import { ResultDetail, useResult } from "@/hooks/useResult";
import styles from "./styles.module.css";

type Payload = {
  advice: GameContextType["advice"];
  enableAdviser: boolean;
  resultDetails: ReturnType<
    ReturnType<typeof useResult>["generateResultDetails"]
  >;
  score: ReturnType<
    ReturnType<typeof useResult>["calculateCompatibilityScore"]
  >;
} & Pick<ReturnType<typeof useRestart>, "restartGame"> &
  Pick<ReturnType<typeof useResult>, "getAdvice">;

export const Result = ({
  advice,
  enableAdviser,
  getAdvice,
  resultDetails,
  restartGame,
  score,
}: Payload) => {
  const renderResultDetails = (
    resultDetails: ReturnType<
      ReturnType<typeof useResult>["generateResultDetails"]
    >
  ) => {
    if (Object.keys(resultDetails).length === 0) {
      return;
    }

    return (
      <>
        {Object.keys(resultDetails.wrong).length > 0 && <p>Wrong answers:</p>}

        {resultDetails.wrong.map((detail) => renderResultDetail(detail))}

        {Object.keys(resultDetails.wrong).length > 0 &&
          Object.keys(resultDetails.correct).length > 0 && <hr />}

        {Object.keys(resultDetails.correct).length > 0 && (
          <p>Correct answers:</p>
        )}

        {resultDetails.correct.map((detail) => renderResultDetail(detail))}
      </>
    );
  };

  const renderResultDetail = ({
    question,
    yourAnswer,
    partnerAnswer,
  }: ResultDetail) => (
    <section className={styles.questionContainer} key={question}>
      <div>
        <span className={styles.label}>Question:</span> {question}
      </div>
      <div>
        <span className={styles.label}>Your Answer:</span> {yourAnswer}
      </div>
      <div>
        <span className={styles.label}>Partner&apos;s Answer:</span>{" "}
        {partnerAnswer}
      </div>
    </section>
  );

  return (
    <div className={styles.container}>
      <p className={styles.score}>
        <span>{score.matches}</span> out of <span>{score.total}</span>
      </p>
      <h1 className={styles.scorePercentage}>{score.percentage}%</h1>

      {advice && <Advice advice={advice} />}

      <section>{renderResultDetails(resultDetails)}</section>

      <ButtonContainer>
        {enableAdviser && !advice && (
          <Button hasOuter onClick={getAdvice}>
            Get advice!
          </Button>
        )}

        <Button compact hasOuter onClick={() => restartGame()}>
          Play again
        </Button>

        <Button transparent onClick={() => (window.location.href = "/game")}>
          Go to menu
        </Button>
      </ButtonContainer>
    </div>
  );
};
