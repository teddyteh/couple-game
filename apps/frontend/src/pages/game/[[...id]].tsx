import { styles } from "@/_styles";
import { HeaderComponent } from "@/components/header";
import { QuestionComponent } from "@/components/question";
import { ResultComponent } from "@/components/result";
import { StoreComponent } from "@/components/store";
import { GameContext } from "@/hooks/context";
import { useConnectionManagement } from "@/hooks/useConnectionManagement";
import { useGameLogic } from "@/hooks/useGameLogic";
import { useInitialization } from "@/hooks/useInitialization";
import { useMessage } from "@/hooks/useMessage";
import { useRestart } from "@/hooks/useRestart";
import { useResult } from "@/hooks/useResult";
import { useStore } from "@/hooks/useStore";
import { useContext } from "react";

const Game = () => {
  const { fetchQuestionsFromURL } = useInitialization();
  const { goToStore } = useStore();
  const { restartGame } = useRestart({ fetchQuestionsFromURL });
  const { createNewGame } = useConnectionManagement({ restartGame });
  const { handleAnswerSelection, handleNextButtonClick } = useGameLogic();
  const { calculateCompatibilityScore, generateResultDetails } = useResult();
  useMessage();

  const {
    products,
    availablePurchases,
    isShowingStore,
    gameId,
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
        {!isGameStarted && !gameId && (
          <>
            <button style={styles.button} onClick={createNewGame}>
              Start Game
            </button>
            <button style={styles.button} onClick={goToStore}>
              Store
            </button>
          </>
        )}

        {isShowingStore && (
          <StoreComponent
            products={products}
            availablePurchases={availablePurchases}
          />
        )}

        {!isGameStarted && gameId && (
          <div>Waiting for someone to join the game...</div>
        )}

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
                style={
                  !selectedOption
                    ? { ...styles.button, ...styles.disabledButton }
                    : styles.button
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
