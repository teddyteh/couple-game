import { Alert } from "@/components/alert";
import { MenuComponent } from "@/components/menu";
import { QuestionComponent } from "@/components/question";
import { ResultComponent } from "@/components/result";
import { ScreenComponent } from "@/components/screen";
import { ShareComponent } from "@/components/share";
import { StoreComponent } from "@/components/store";
import { GameContext } from "@/hooks/context";
import { useAlert } from "@/hooks/useAlert";
import { useConnectionManagement } from "@/hooks/useConnectionManagement";
import { useGameLogic } from "@/hooks/useGameLogic";
import { useInitialization } from "@/hooks/useInitialization";
import { useMobileBridge } from "@/hooks/useMobileBridge";
import { useRestart } from "@/hooks/useRestart";
import { useResult } from "@/hooks/useResult";
import { useStore } from "@/hooks/useStore";
import { useContext } from "react";

const Game = () => {
  const { fetchQuestionsFromURL } = useInitialization();

  const { toggleShowStore } = useStore();
  const { showAlert } = useAlert();
  const { purchase } = useMobileBridge({ showAlert });

  const { restartGame } = useRestart({ fetchQuestionsFromURL });
  const { createNewGame, getShareLink, copyShareLink } =
    useConnectionManagement({ restartGame });
  const { handleAnswerSelection } = useGameLogic();
  const { calculateCompatibilityScore, generateResultDetails } = useResult();

  const {
    products,
    availablePurchases,
    isShowingStore,
    alert,
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
    <div className="main-container">
      <div className="wrapper">
        {!isGameStarted && !gameId && !isShowingStore && (
          <MenuComponent
            createNewGame={createNewGame}
            shouldShowStore={products.length > 0}
            toggleShowStore={toggleShowStore}
          />
        )}

        {isShowingStore && (
          <StoreComponent
            products={products}
            availablePurchases={availablePurchases}
            purchase={purchase}
          />
        )}

        {!isGameStarted && gameId && (
          <ShareComponent
            shareLink={getShareLink()}
            copyShareLink={copyShareLink}
          />
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
            <div>Waiting for the other player to finish...</div>
          </ScreenComponent>
        )}

        {JSON.stringify(alert)}

        <Alert data={alert} />
      </div>
    </div>
  );
};

export default Game;
