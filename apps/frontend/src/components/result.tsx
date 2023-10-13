import { useRestart } from "../hooks/useRestart";
import { useResult } from "../hooks/useResult";

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
  return (
    <div className="result-container">
      <p className="score">
        <span>{score.matches}</span> out of <span>{score.total}</span>
      </p>
      <h1 className="score-percentage">{score.percentage}%</h1>
      <section>
        {Object.keys(resultDetails).length > 0 && <p>Wrong answers:</p>}

        {resultDetails.map((detail) => (
          <section className="question-container" key={detail.question}>
            <div>
              <span className="label">Question:</span> {detail.question}
            </div>
            <div>
              <span className="label">Your Answer:</span> {detail.yourAnswer}
            </div>
            <div>
              <span className="label">Partner&apos;s Answer:</span>{" "}
              {detail.partnerAnswer}
            </div>
          </section>
        ))}
      </section>

      <button className="default-button" onClick={() => restartGame()}>
        Play again
      </button>
    </div>
  );
};
