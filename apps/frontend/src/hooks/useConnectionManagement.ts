import { copyToClipboard } from "@/utils";
import { DataConnection } from "peerjs";
import { useContext, useEffect } from "react";
import { GameContext } from "./context";
import { useRestart } from "./useRestart";

type Payload = Pick<ReturnType<typeof useRestart>, "restartGame">;

export const useConnectionManagement = ({ restartGame }: Payload) => {
  const {
    router,
    setGameId,
    peer,
    gameId,
    setConn,
    setIsPartnerFinished,
    setPartnerAnswers,
    setIsGameStarted,
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
      setupConnectionEvents();
    }
  }, [peer, gameId]);

  const createNewGame = () => {
    if (peer) {
      setGameId(peer.id);
    }
  };

  const getShareLink = () => `${window.location.origin}/game/${gameId}`;

  const copyShareLink = () => copyToClipboard(getShareLink());

  const setupConnectionEvents = () => {
    if (!peer || !gameId) return;

    if (peer.id === gameId) {
      peer.on("connection", (connection) => {
        setConn(connection);
        initConnectionEvents(connection);
      });
    } else {
      const connection = peer.connect(gameId);
      setConn(connection);
      initConnectionEvents(connection);
    }
  };

  const initConnectionEvents = (connection: DataConnection) => {
    connection.on("open", () => connection.send({ connected: true }));
    connection.on("data", (data: any) => {
      if (data.connected) {
        setIsGameStarted(true);
      } else if (data.finished) {
        setIsPartnerFinished(true);
      } else if (data.restart) {
        restartGame();
      } else {
        setPartnerAnswers(data.answers);
      }
    });
    connection.on("error", (err) => console.error("Connection error:", err));
  };

  return {
    createNewGame,
    getShareLink,
    copyShareLink,
  };
};
