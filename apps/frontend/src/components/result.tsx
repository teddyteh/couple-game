import { useRestart } from "../hooks/useRestart";
import { useResult } from "../hooks/useResult";
import { FooterComponent } from "./footer";
import { LogoComponent } from "./logo";

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
    <div className="screen-section result-screen">
      <div className="quiz-image-wrapper">
        <LogoComponent />
      </div>
      <p className="score">
        <span id="score">{score.matches}</span> out of{" "}
        <span id="score-total">{score.total}</span>
      </p>
      <h1 id="score-name" className="score-name">
        {score.percentage}%
      </h1>
      <span className="description">
        {resultDetails.map((detail, index) => (
          <div key={index}>
            <div>Question: {detail.question}</div>
            <div>Your Answer: {detail.yourAnswer}</div>
            <div>Partner&apos;s Answer: {detail.partnerAnswer}</div>
          </div>
        ))}
      </span>

      <button className="default-button" id="start3" onClick={restartGame}>
        Play again
      </button>

      <FooterComponent />
    </div>
  );
};
