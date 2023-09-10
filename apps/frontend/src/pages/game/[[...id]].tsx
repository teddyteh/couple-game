import { useContext } from "react";
import { HeaderComponent } from "./_components/header";
import { QuestionComponent } from "./_components/question";
import { ResultComponent } from "./_components/result";
import { GameContext } from "./_hooks/context";
import { useConnectionManagement } from "./_hooks/useConnectionManagement";
import { useGameLogic } from "./_hooks/useGameLogic";
import { useInitialization } from "./_hooks/useInitialization";
import { useRestart } from "./_hooks/useRestart";
import { useResult } from "./_hooks/useResult";
import { styles } from "./styles";

const Game = () => {
  const { fetchQuestionsFromURL } = useInitialization();
  const { restartGame } = useRestart({ fetchQuestionsFromURL });
  useConnectionManagement({ restartGame });
  const { handleAnswerSelection, handleNextButtonClick } = useGameLogic();
  const { calculateCompatibilityScore, generateResultDetails } = useResult();

  const {
    isGameStarted,
    isPlayerFinished,
    isPartnerFinished,
    questions,
    currentQuestionIndex,
    selectedOption,
    timeLeft,
  } = useContext(GameContext);

  return (
    <div style={styles.container}>
      <div id="display-container" style={styles.displayContainer}>
        {!isGameStarted && <div>Waiting for someone to join the game...</div>}

        {isGameStarted && !isPlayerFinished && (
          <>
            <HeaderComponent
              currentQuestionIndex={currentQuestionIndex}
              questionsLength={questions.length}
              timeLeft={timeLeft}
            />

            <QuestionComponent
              currentQuestion={questions[currentQuestionIndex]}
              selectedOption={selectedOption}
              handleAnswerSelection={handleAnswerSelection}
            />

            {isGameStarted &&
            !isPlayerFinished &&
            questions.length > 0 &&
            currentQuestionIndex < questions.length ? (
              <button
                id="next-button"
                style={
                  !selectedOption
                    ? { ...styles.nextButton, ...styles.disabledNextButton }
                    : styles.nextButton
                }
                onClick={handleNextButtonClick}
              >
                Next
              </button>
            ) : null}
          </>
        )}

        {isGameStarted && isPlayerFinished && !isPartnerFinished && (
          <div>Waiting for the other player to finish...</div>
        )}

        {isGameStarted && isPlayerFinished && isPartnerFinished && (
          <ResultComponent
            score={calculateCompatibilityScore()}
            resultDetails={generateResultDetails()}
            restartGame={restartGame}
          />
        )}
      </div>
    </div>
  );
};

export default Game;
