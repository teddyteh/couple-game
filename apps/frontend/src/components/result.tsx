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
    <>
      <p className="score">
        <span>{score.matches}</span> out of <span>{score.total}</span>
      </p>
      <h1 className="score-name">{score.percentage}%</h1>
      <section>
        <p>Wrong answers:</p>
        
        {resultDetails.map((detail, index) => (
          <section className="details" key={detail.question}>
            <div>
              <span className="label">Question {index + 1}:</span>{" "}
              {detail.question}
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

      <button className="default-button" onClick={restartGame}>
        Play again
      </button>
    </>
  );
};
