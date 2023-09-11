import { useRestart } from "../_hooks/useRestart";
import { useResult } from "../_hooks/useResult";
import { styles } from "../styles";

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
    <div className="score-container" style={styles.scoreContainer}>
      <div id="user-score" style={styles.userScore}>
        Score: {score}%
      </div>
      {resultDetails.map((detail, index) => (
        <div key={index}>
          <div>Question: {detail.question}</div>
          <div>Your Answer: {detail.yourAnswer}</div>
          <div>Partner&apos;s Answer: {detail.partnerAnswer}</div>
        </div>
      ))}
      <button
        style={{ ...styles.button, ...styles.restartButton }}
        onClick={restartGame}
      >
        Restart
      </button>
    </div>
  );
};
