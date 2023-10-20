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
  const {
    advice,
    alert,
    currentQuestionIndex,
    gameId,
    hasCopiedShareLink,
    isGameStarted,
    isPartnerFinished,
    isPlayerFinished,
    isSelectingCategory,
    isShowingHowToPlay,
    isShowingStore,
    loadingText,
    products,
    questions,
    selectedOption,
    setHasCopiedShareLink,
    timeLeft,
  } = useContext(GameContext);

  useInitialization();
  const { showAlert } = useAlert();

  const { toggleShowStore, toggleShowHowToPlay } = useMenu();
  const { isAvailableForPurchase, getButtonText } = useStore();
  const { purchase, sendMessage } = useMobileBridge({ showAlert });

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
    sendMessage,
  });
  const { handleAnswerSelection } = useGame();
  const { calculateCompatibilityScore, generateResultDetails, getAdvice } =
    useResult();

  const renderMenuOrStore = () => {
    if (loadingText || isGameStarted || gameId) {
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
        shouldShowStore={products.length > 0}
        toggleShowStore={toggleShowStore}
        isSelectingCategory={isSelectingCategory}
        purchasedProducts={purchasedProducts}
        isShowingHowToPlay={isShowingHowToPlay}
        toggleShowHowToPlay={toggleShowHowToPlay}
      />
    );
  };

  const renderShareOrJoiningScreen = () => {
    if (loadingText || isGameStarted || !gameId) {
      return;
    }

    if (isHost) {
      return (
        <ShareComponent
          shareLink={getShareLink()}
          hasCopiedShareLink={hasCopiedShareLink}
          setHasCopiedShareLink={setHasCopiedShareLink}
          copyShareLink={copyShareLink}
          shouldShowStore={products.length > 0}
        />
      );
    }

    return <h1>Joining game...</h1>;
  };

  const renderQuestionOrResult = () => {
    if (loadingText || !isGameStarted) {
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
        <>
          <ResultComponent
            score={calculateCompatibilityScore()}
            resultDetails={generateResultDetails()}
            restartGame={restartGame}
            getAdvice={getAdvice}
            advice={advice}
          />
        </>
      );
    }

    return (
      <>
        <h1>Waiting for the other player to finish...</h1>
      </>
    );
  };

  const renderLoading = () => loadingText && <h2>{loadingText}</h2>;

  return (
    <div className="main-container">
      <div className="wrapper">
        <Alert data={alert} />

        <ScreenComponent small={isGameStarted}>
          {renderMenuOrStore()}
          {renderShareOrJoiningScreen()}
          {renderQuestionOrResult()}
          {renderLoading()}
        </ScreenComponent>
      </div>
    </div>
  );
};

export default Game;
