import { useGameLogic } from "../_hooks/useGameLogic";
import { styles } from "../styles";

type Payload = {
  currentQuestion: { question: string; options: string[] };
  selectedOption: string | null;
  handleAnswerSelection: ReturnType<
    typeof useGameLogic
  >["handleAnswerSelection"];
};

export const QuestionComponent = ({
  currentQuestion,
  selectedOption,
  handleAnswerSelection,
}: Payload) => {
  return (
    <div id="container" style={styles.containerDiv}>
      <div className="question" style={styles.question}>
        {currentQuestion.question}
      </div>
      <div style={styles.options}>
        {currentQuestion.options.map((option) => (
          <button
            key={option}
            className={`option-div ${
              selectedOption === option ? "selected" : ""
            }`}
            style={
              selectedOption === option
                ? { ...styles.optionDiv, ...styles.selectedOptionDiv }
                : styles.optionDiv
            }
            onClick={() => handleAnswerSelection(option)}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
