import { useRestart } from "../hooks/useRestart";
import { ResultDetail, useResult } from "../hooks/useResult";

type Payload = {
  score: ReturnType<
    ReturnType<typeof useResult>["calculateCompatibilityScore"]
  >;
  resultDetails: ReturnType<
    ReturnType<typeof useResult>["generateResultDetails"]
  >;
  restartGame: ReturnType<typeof useRestart>["restartGame"];
};

export const ResultComponent = ({
  score,
  resultDetails,
  restartGame,
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

        {(Object.keys(resultDetails.wrong).length > 0 ||
          Object.keys(resultDetails.correct).length > 0) && <hr />}

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

      <section>{renderResultDetails(resultDetails)}</section>

      <button className="default-button" onClick={() => restartGame()}>
        Play again
      </button>
    </div>
  );
};
