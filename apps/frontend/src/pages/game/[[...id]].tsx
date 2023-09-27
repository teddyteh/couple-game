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

  const renderMenuOrStore = () => {
    if (!isGameStarted && !gameId) {
      return isShowingStore ? (
        <StoreComponent
          products={products}
          availablePurchases={availablePurchases}
          purchase={purchase}
        />
      ) : (
        <MenuComponent
          createNewGame={createNewGame}
          shouldShowStore={products.length > 0}
          toggleShowStore={toggleShowStore}
        />
      );
    }
  };

  const renderShareOrJoiningScreen = () => {
    if (!isGameStarted && gameId) {
      return isHost ? (
        <ShareComponent
          shareLink={getShareLink()}
          hasCopiedShareLink={hasCopiedShareLink}
          setHasCopiedShareLink={setHasCopiedShareLink}
          copyShareLink={copyShareLink}
        />
      ) : (
        <h1>Joining the game...</h1>
      );
    }
  };

  const renderQuestionOrResult = () => {
    if (isGameStarted) {
      if (!isPlayerFinished) {
        return (
          <QuestionComponent
            currentQuestionIndex={currentQuestionIndex}
            questionsLength={questions.length}
            timeLeft={timeLeft}
            currentQuestion={questions[currentQuestionIndex]}
            selectedOption={selectedOption}
            handleAnswerSelection={handleAnswerSelection}
          />
        );
      } else {
        return isPartnerFinished ? (
          <ResultComponent
            score={calculateCompatibilityScore()}
            resultDetails={generateResultDetails()}
            restartGame={restartGame}
          />
        ) : (
          <>
            <h1>Waiting for the other player to finish...</h1>
          </>
        );
      }
    }
  };

  return (
    <div className="main-container">
      <div className="wrapper">
        <ScreenComponent>
          {renderMenuOrStore()}
          {renderShareOrJoiningScreen()}
          {renderQuestionOrResult()}
        </ScreenComponent>
        <Alert data={alert} />
      </div>
    </div>
  );
};

export default Game;
