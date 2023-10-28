import { MainContainer } from "@/components/atoms/MainContainer";
import { Alert } from "@/components/molecules/Alert";
import { Share } from "@/components/molecules/Share";
import { HowToPlay } from "@/components/organisms/HowToPlay";
import { Menu } from "@/components/organisms/Menu";
import { Question } from "@/components/organisms/Question";
import { Result } from "@/components/organisms/Result";
import { Screen } from "@/components/organisms/Screen";
import { Store } from "@/components/organisms/Store";
import { GameContext } from "@/contexts/game";
import { useAlert } from "@/hooks/useAlert";
import { useGame } from "@/hooks/useGame";
import { useInitialization } from "@/hooks/useInitialization";
import { useLobby } from "@/hooks/useLobby";
import { useMenu } from "@/hooks/useMenu";
import { useMobileBridge } from "@/hooks/useMobileBridge";
import { useRestart } from "@/hooks/useRestart";
import { useResult } from "@/hooks/useResult";
import { useSessionStorage } from "@/hooks/useSessionStorage";
import { useStore } from "@/hooks/useStore";
import { useContext } from "react";
import { SKUS } from "../api/skus";

const MAX_FREE_ADVICE_FETCH_COUNT = 3;

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
  const [adviceFetchCount] = useSessionStorage("adviceFetchCount", 0);
  const { purchase, sendMessage, inApp } = useMobileBridge({ showAlert });

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
        <Store
          toggleShowStore={toggleShowStore}
          products={products}
          purchase={purchase}
          isAvailableForPurchase={isAvailableForPurchase}
          getButtonText={getButtonText}
        />
      );
    }

    if (isShowingHowToPlay) {
      return <HowToPlay toggleShowHowToPlay={toggleShowHowToPlay} />;
    }

    return (
      <Menu
        createNewGame={createNewGame}
        unsetCategorySelection={unsetCategorySelection}
        shouldShowStore={inApp}
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
        <Share
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
        <Question
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
      const shouldEnableAdviser = () => {
        if (!isHost) {
          return false;
        }

        if (inApp) {
          return !isAvailableForPurchase(SKUS.the_adviser);
        }

        return adviceFetchCount < MAX_FREE_ADVICE_FETCH_COUNT;
      };

      return (
        <>
          <Result
            score={calculateCompatibilityScore()}
            resultDetails={generateResultDetails()}
            restartGame={restartGame}
            getAdvice={getAdvice}
            advice={advice}
            enableAdviser={shouldEnableAdviser()}
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
    <MainContainer>
      <Alert data={alert} />

      <Screen small={isGameStarted}>
        {renderMenuOrStore()}
        {renderShareOrJoiningScreen()}
        {renderQuestionOrResult()}
        {renderLoading()}
      </Screen>
    </MainContainer>
  );
};

export default Game;
