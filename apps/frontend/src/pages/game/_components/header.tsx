import { GameContextType } from "../_hooks/context";
import { styles } from "../_styles";

type Payload = { questionsLength: number } & Pick<
  GameContextType,
  "currentQuestionIndex" | "timeLeft"
>;

export const HeaderComponent = ({
  currentQuestionIndex,
  questionsLength,
  timeLeft,
}: Payload) => {
  return (
    <div className="header" style={styles.header}>
      <div className="number-of-count">
        <span className="number-of-question">
          {currentQuestionIndex + 1} of {questionsLength} questions
        </span>
      </div>
      <div className="timer-div" style={styles.timerDiv}>
        <img
          src="https://uxwing.com/wp-content/themes/uxwing/download/time-and-date/stopwatch-icon.png"
          width="20px"
          alt="Timer Icon"
        />
        <span className="time-left">{timeLeft}s</span>
      </div>
    </div>
  );
};
