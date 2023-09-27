import { Alert } from "@/components/alert";
import { MenuComponent } from "@/components/menu";
import { QuestionComponent } from "@/components/question";
import { ResultComponent } from "@/components/result";
import { ScreenComponent } from "@/components/screen";
import { ShareComponent } from "@/components/share";
import { StoreComponent } from "@/components/store";
import { GameContext } from "@/hooks/context";
import { useAlert } from "@/hooks/useAlert";
import { useGame } from "@/hooks/useGame";
import { useInitialization } from "@/hooks/useInitialization";
import { useLobby } from "@/hooks/useLobby";
import { useMobileBridge } from "@/hooks/useMobileBridge";
import { useRestart } from "@/hooks/useRestart";
import { useResult } from "@/hooks/useResult";
import { useStore } from "@/hooks/useStore";
import { useContext } from "react";

const Game = () => {
  useInitialization();

  const { toggleShowStore } = useStore();
  const { showAlert } = useAlert();
  const { purchase } = useMobileBridge({ showAlert });

  const { restartGame } = useRestart();
  const { isHost, createNewGame, getShareLink, copyShareLink } = useLobby({
    restartGame,
  });
  const { handleAnswerSelection } = useGame();
  const { calculateCompatibilityScore, generateResultDetails } = useResult();

  const {
    products,
    availablePurchases,
    isShowingStore,
    alert,
    gameId,
    hasCopiedShareLink,
    setHasCopiedShareLink,
    isGameStarted,
    isPlayerFinished,
    isPartnerFinished,
    questions,
    currentQuestionIndex,
    selectedOption,
    timeLeft,
  } = useContext(GameContext);

  return (
    <div className="main-container">
      <div className="wrapper">
        {!isGameStarted && !gameId && !isShowingStore && (
          <MenuComponent
            createNewGame={createNewGame}
            shouldShowStore={products.length > 0}
            toggleShowStore={toggleShowStore}
          />
        )}

        {!isGameStarted && !gameId && isShowingStore && (
          <StoreComponent
            products={products}
            availablePurchases={availablePurchases}
            purchase={purchase}
          />
        )}

        {!isGameStarted && gameId && isHost && (
          <ShareComponent
            shareLink={getShareLink()}
            hasCopiedShareLink={hasCopiedShareLink}
            setHasCopiedShareLink={setHasCopiedShareLink}
            copyShareLink={copyShareLink}
          />
        )}

        {!isGameStarted && gameId && !isHost && (
          <ScreenComponent>
            <h1>Joining the game...</h1>
          </ScreenComponent>
        )}

        {isGameStarted && !isPlayerFinished && (
          <QuestionComponent
            currentQuestionIndex={currentQuestionIndex}
            questionsLength={questions.length}
            timeLeft={timeLeft}
            currentQuestion={questions[currentQuestionIndex]}
            selectedOption={selectedOption}
            handleAnswerSelection={handleAnswerSelection}
          />
        )}

        {isGameStarted && isPlayerFinished && isPartnerFinished && (
          <ResultComponent
            score={calculateCompatibilityScore()}
            resultDetails={generateResultDetails()}
            restartGame={restartGame}
          />
        )}

        {isGameStarted && isPlayerFinished && !isPartnerFinished && (
          <ScreenComponent>
            <h1>Waiting for the other player to finish...</h1>
          </ScreenComponent>
        )}

        <Alert data={alert} />
      </div>
    </div>
  );
};

export default Game;
