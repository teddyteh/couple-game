import { GameContextType } from "@/hooks/context";
import { useRestart } from "../hooks/useRestart";
import { ResultDetail, useResult } from "../hooks/useResult";
import { AdviceComponent } from "./advice";

type Payload = {
  score: ReturnType<
    ReturnType<typeof useResult>["calculateCompatibilityScore"]
  >;
  resultDetails: ReturnType<
    ReturnType<typeof useResult>["generateResultDetails"]
  >;
  advice: GameContextType["advice"];
  enableAdviser: boolean;
} & Pick<ReturnType<typeof useRestart>, "restartGame"> &
  Pick<ReturnType<typeof useResult>, "getAdvice">;

export const ResultComponent = ({
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
    <section className="question-container" key={question}>
      <div>
        <span className="label">Question:</span> {question}
      </div>
      <div>
        <span className="label">Your Answer:</span> {yourAnswer}
      </div>
      <div>
        <span className="label">Partner&apos;s Answer:</span> {partnerAnswer}
      </div>
    </section>
  );

  return (
    <div className="result-container">
      <p className="score">
        <span>{score.matches}</span> out of <span>{score.total}</span>
      </p>
      <h1 className="score-percentage">{score.percentage}%</h1>

      {advice && <AdviceComponent advice={advice} />}

      <section>{renderResultDetails(resultDetails)}</section>

      <div className="button-container">
        {enableAdviser && !advice && (
          <div className="button-outer">
            <button className="default-button" onClick={getAdvice}>
              Get advice!
            </button>
          </div>
        )}

        <div className="button-outer">
          <button className="default-button" onClick={() => restartGame()}>
            Play again
          </button>

          <button
            className="default-button transparent"
            onClick={() => (window.location.href = "/game")}
          >
            Go to menu
          </button>
        </div>
      </div>
    </div>
  );
};
