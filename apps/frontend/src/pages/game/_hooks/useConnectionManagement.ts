import { copyToClipboard } from "@/utils";
import { DataConnection } from "peerjs";
import { useContext, useEffect } from "react";
import { GameContext } from "./context";

export const useConnectionManagement = () => {
  const {
    peer,
    router,
    setGameId,
    gameId,
    setConn,
    setIsPartnerFinished,
    setPartnerAnswers,
    isGameStarted,
    setIsGameStarted,
  } = useContext(GameContext);
  const { id } = router?.query ?? {};

  useEffect(() => {
    if (id && id.length > 0) {
      setGameId(id[0]);
    }
  }, [id]);

  useEffect(() => {
    if (peer && !id) createNewGame();
  }, [peer, id]);

  useEffect(() => {
    if (peer && gameId) setupConnectionEvents();
  }, [peer, gameId]);

  const createNewGame = () => {
    if (peer) {
      setGameId(peer.id);
      copyToClipboard(`${window.location.origin}/game/${peer.id}`);
    }
  };

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
    connection.on("open", () => connection.send("TEST"));
    connection.on("data", (data: any) => {
      if (data.finished) {
        setIsPartnerFinished(true);
      } else {
        setPartnerAnswers(data.answers);
      }

      if (!isGameStarted) {
        setIsGameStarted(true);
      }
    });
    connection.on("error", (err) => console.error("Connection error:", err));
  };
};
