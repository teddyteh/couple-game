import { Alert } from "@/components/alert";
import { HowToPlayComponent } from "@/components/how-to-play";
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
import { useMenu } from "@/hooks/useMenu";
import { useMobileBridge } from "@/hooks/useMobileBridge";
import { useRestart } from "@/hooks/useRestart";
import { useResult } from "@/hooks/useResult";
import { useStore } from "@/hooks/useStore";
import { useContext } from "react";

const Game = () => {
  useInitialization();
  const { showAlert } = useAlert();

  const { toggleShowStore, toggleShowHowToPlay } = useMenu();
  const { isAvailableForPurchase, getButtonText } = useStore();
  const { purchase } = useMobileBridge({ showAlert });

  const { resetGameState, restartGame } = useRestart();
  const {
    isHost,
    purchasedProducts,
    createNewGame,
    unsetCategorySelection,
    getShareLink,
    copyShareLink,
  } = useLobby({
    resetGameState,
    restartGame,
    showAlert,
  });
  const { handleAnswerSelection } = useGame();
  const { calculateCompatibilityScore, generateResultDetails } = useResult();

  const {
    products,
    isShowingStore,
    isSelectingCategory,
    isShowingHowToPlay,
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
    if (isGameStarted || gameId) {
      return;
    }

    if (isShowingStore) {
      return (
        <StoreComponent
          toggleShowStore={toggleShowStore}
          products={products}
          purchase={purchase}
          isAvailableForPurchase={isAvailableForPurchase}
          getButtonText={getButtonText}
        />
      );
    }

    if (isShowingHowToPlay) {
      return <HowToPlayComponent toggleShowHowToPlay={toggleShowHowToPlay} />;
    }

    return (
      <MenuComponent
        createNewGame={createNewGame}
        unsetCategorySelection={unsetCategorySelection}
        shouldShowStore={!!(products && products.length > 0)}
        toggleShowStore={toggleShowStore}
        isSelectingCategory={isSelectingCategory}
        purchasedProducts={purchasedProducts}
        isShowingHowToPlay={isShowingHowToPlay}
        toggleShowHowToPlay={toggleShowHowToPlay}
      />
    );
  };

  const renderShareOrJoiningScreen = () => {
    if (isGameStarted || !gameId) {
      return;
    }

    if (isHost) {
      return (
        <ShareComponent
          shareLink={getShareLink()}
          hasCopiedShareLink={hasCopiedShareLink}
          setHasCopiedShareLink={setHasCopiedShareLink}
          copyShareLink={copyShareLink}
        />
      );
    }

    return <h1>Joining the game...</h1>;
  };

  const renderQuestionOrResult = () => {
    if (!isGameStarted) {
      return;
    }

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
    }

    if (isPartnerFinished) {
      return (
        <ResultComponent
          score={calculateCompatibilityScore()}
          resultDetails={generateResultDetails()}
          restartGame={restartGame}
        />
      );
    }

    return (
      <>
        <h1>Waiting for the other player to finish...</h1>
      </>
    );
  };

  return (
    <div className="main-container">
      <div className="wrapper">
        <Alert data={alert} />

        <ScreenComponent>
          {renderMenuOrStore()}
          {renderShareOrJoiningScreen()}
          {renderQuestionOrResult()}
        </ScreenComponent>
      </div>
    </div>
  );
};

export default Game;
