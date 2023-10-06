import { copyToClipboard } from "@/utils";
import { fetchQuestionsFromURL } from "@/utils/question";
import { DataConnection, Peer } from "peerjs";
import { useContext, useEffect } from "react";
import { GameContext } from "./context";
import { useAlert } from "./useAlert";
import { useRestart } from "./useRestart";

type Payload = Pick<
  ReturnType<typeof useRestart>,
  "resetGameState" | "restartGame"
> &
  Pick<ReturnType<typeof useAlert>, "showAlert">;

export const useLobby = ({
  resetGameState,
  restartGame,
  showAlert,
}: Payload) => {
  const {
    router,
    peer,
    gameId,
    setGameId,
    setHasCopiedShareLink,
    conn,
    setConn,
    setIsSelectingCategory,
    setCategory,
    questions,
    setQuestions,
    products,
    availablePurchases,
    isGameStarted,
    setIsGameStarted,
    setIsPartnerFinished,
    setPartnerAnswers,
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
      conn?.send({ questions });
    }
  }, [isGameStarted, conn, questions]);

  const isHost = peer?.id === gameId;

  const purchasedProducts = products.filter(
    (product) =>
      !availablePurchases?.some((p) => p.productId === product.productId)
  );

  const createNewGame = async (selectedCategory?: string) => {
    if (purchasedProducts.length > 0 && !selectedCategory) {
      setIsSelectingCategory(true);
      return;
    }

    const category =
      purchasedProducts.length === 0 || !selectedCategory
        ? "couple-compatibility"
        : selectedCategory;
    setCategory(category);

    const questions = await fetchQuestionsFromURL(category);
    setQuestions(questions);

    peer?.id && setGameId(peer.id);
  };

  const getShareLink = () => `${window.location.origin}/game/${gameId}`;

  const copyShareLink = () => {
    copyToClipboard(getShareLink());
    setHasCopiedShareLink(true);
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
        connection.send({ connected: true });
      });

      // Check the connection status after 5 seconds
      setTimeout(() => {
        if (!isConnected) {
          showAlert({
            title: "Connection Failed",
            message: "Unable to connect.",
          });
        }
      }, 3000);

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
            router?.push("/game");
          }
        );
      }, 5000);
    };

    connection.on("data", (data: any) => {
      // Reset the timer every time data is received
      resetTimer();

      if (data.connected) {
        // Notify the host that player 2 has connected
        setIsGameStarted(true);
      } else if (data.restart && data.questions) {
        restartGame(data.questions);
      } else if (data.questions) {
        // Player 2
        setQuestions(data.questions);
        setIsGameStarted(true);
      } else if (data.finished) {
        setIsPartnerFinished(true);
      } else {
        setPartnerAnswers(data.answers);
      }
    });

    connection.on("error", (err) => console.error("Connection error:", err));
  };

  return {
    isHost,
    purchasedProducts,
    createNewGame,
    fetchQuestionsFromURL,
    getShareLink,
    copyShareLink,
  };
};
