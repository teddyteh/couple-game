import { copyToClipboard } from "@/utils";
import { fetchQuestions } from "@/utils/question";
import { useRouter } from "next/router";
import { DataConnection } from "peerjs";
import { useContext, useEffect } from "react";
import { GameContext } from "./context";
import { useAlert } from "./useAlert";
import { useMobileBridge } from "./useMobileBridge";
import { useRestart } from "./useRestart";

type Payload = Pick<
  ReturnType<typeof useRestart>,
  "resetGameState" | "restartGame"
> &
  Pick<ReturnType<typeof useAlert>, "showAlert"> &
  Pick<ReturnType<typeof useMobileBridge>, "sendMessage">;

const TIMEOUT_MS = 3000;

export const useLobby = ({ restartGame, showAlert, sendMessage }: Payload) => {
  const router = useRouter();

  const {
    availablePurchases,
    category,
    conn,
    gameId,
    isGameStarted,
    peer,
    products,
    questions,
    setCategory,
    setConn,
    setGameId,
    setHasCopiedShareLink,
    setIsGameStarted,
    setIsPartnerFinished,
    setIsSelectingCategory,
    setPartnerAnswers,
    setQuestions,
    setLoadingText,
} = useContext(GameContext);
  const { id } = router?.query ?? {};

  useEffect(() => {
    if (id && id.length > 0) {
      setGameId(id[0]);
    }
  }, [id]);

  useEffect(() => {
    if (gameId) {
      copyShareLink();
    }
    if (peer && gameId) {
      _setupConnectionEvents();
    }
  }, [peer, gameId]);

  useEffect(() => {
    // The host sends questions to player 2
    if (isGameStarted) {
      conn?.send({ type: "gameStarted", questions, category });
    }
  }, [isGameStarted, conn, questions]);

  const isHost = peer?.id === gameId;

  const purchasedProducts = products.filter((product) =>
    availablePurchases.some((p) => p.productId === product.productId)
  );

  const createNewGame = async (selectedCategory?: string) => {
    if (purchasedProducts.length > 0 && !selectedCategory) {
      setIsSelectingCategory(true);
      return;
    }

    setLoadingText("Loading game...");

    const category =
      purchasedProducts.length === 0 || !selectedCategory
        ? "couple-compatibility"
        : selectedCategory;
    setCategory(category);

    const questions = await fetchQuestions(category);
    setQuestions(questions);

    peer?.id && setGameId(peer.id);

    setLoadingText(null);
  };

  const unsetCategorySelection = () => setIsSelectingCategory(false);

  const getShareLink = () => `${window.location.origin}/game/${gameId}`;

  const copyShareLink = async () => {
    const result = await copyToClipboard({
      shareLink: getShareLink(),
      sendMessage,
    });
    setHasCopiedShareLink(result);
  };

  const _setupConnectionEvents = () => {
    if (!peer || !gameId) return;

    if (peer.id === gameId) {
      peer.on("connection", (connection) => {
        _initConnectionEvents(connection);
        setConn(connection);
      });
    } else {
      let isConnected = false;

      const connection = peer.connect(gameId);
      connection.on("open", () => {
        isConnected = true;
        connection.send({ type: "connnected", connected: true });
      });

      // Check the connection status after 5 seconds
      setTimeout(() => {
        if (!isConnected) {
          showAlert(
            {
              title: "Connection Failed",
              message: "Unable to connect.",
            },
            () => {
              window.location.href = "/game";
            }
          );
        }
      }, TIMEOUT_MS);

      _initConnectionEvents(connection);
      setConn(connection);
    }
  };

  const _initConnectionEvents = (connection: DataConnection) => {
    let timer: number;

    const resetTimer = () => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        showAlert(
          {
            title: "Connection Closed",
            message: "The other player has left the game.",
          },
          () => {
            window.location.href = "/game";
          }
        );
      }, TIMEOUT_MS);
    };

    const messageHandlers: Record<string, (data: any) => void> = {
      answers: (data: any) => {
        // Whoever answers first
        setPartnerAnswers(data.answers);
      },
      connnected: (data: any) => {
        // Notify the host that player 2 has connected
        setIsGameStarted(true);
      },
      finished: (data: any) => {
        // Whoever finishes first
        setIsPartnerFinished(true);
      },
      gameStarted: (data: any) => {
        // When Player 2 joins
        setQuestions(data.questions);
        setCategory(data.category);
        setIsGameStarted(true);
      },

      restart: (data: any) => {
        // Whoever initiates the restart
        setCategory(data.category);
        restartGame(data.questions);
      },
    };

    connection.on("data", (data: any) => {
      // Reset the timer every time data is received
      resetTimer();

      messageHandlers[data.type]?.(data);
    });

    connection.on("error", (err) => console.error("Connection error:", err));
  };

  return {
    isHost,
    purchasedProducts,
    createNewGame,
    unsetCategorySelection,
    fetchQuestions,
    getShareLink,
    copyShareLink,
  };
};
