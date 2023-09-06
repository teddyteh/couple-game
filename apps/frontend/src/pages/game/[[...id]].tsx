"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { DataConnection, Peer } from "peerjs";

const Game = () => {
  const router = useRouter();
  const { id } = router.query;

  const [gameId, setGameId] = useState<string | null>(null);
  const [peer, setPeer] = useState<Peer | null>(null);
  const [conn, setConn] = useState<DataConnection | null>(null);

  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [question, setQuestion] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [partnerAnswer, setPartnerAnswer] = useState<string | null>(null);

  useEffect(() => {
    if (id && id.length > 0) {
      setGameId(id[0]);
    }
  }, [id]);

  useEffect(() => {
    initializePeerConnection();
  }, []);

  useEffect(() => {
    if (peer && !id) createNewGame();
  }, [peer, id]);

  useEffect(() => {
    if (peer && gameId) setupConnectionEvents();
  }, [peer, gameId]);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const initializePeerConnection = () => {
    import("peerjs").then(({ default: Peer }) => {
      const myPeer = new Peer();
      myPeer.on("open", () => setPeer(myPeer));
      return () => myPeer.destroy();
    });
  };

  const createNewGame = () => {
    if (peer) {
      setGameId(peer.id);
      copyToClipboard(`http://localhost:3000/game/${peer.id}`);
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
      setPartnerAnswer(data.answer);

      if (!isGameStarted) {
        setIsGameStarted(true);
      }
    });
    connection.on("error", (err) => console.error("Connection error:", err));
  };

  const fetchQuestion = () => {
    setQuestion("What is the capital of France?");
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.info("Copying to clipboard was successful!");
    } catch (error) {
      console.error("Could not copy text: ", error);
    }
  };

  const handleAnswerSelection = (answer: string) => {
    setSelectedAnswer(answer);
    if (conn) conn.send({ answer });
  };

  return (
    <div>
      Game ID: {gameId}
      {isGameStarted  ? (
        <div>
          <div>Question: {question}</div>
          <div>
            <button onClick={() => handleAnswerSelection("Paris")}>
              Paris
            </button>
            <button onClick={() => handleAnswerSelection("London")}>
              London
            </button>
            <button onClick={() => handleAnswerSelection("Berlin")}>
              Berlin
            </button>
            <button onClick={() => handleAnswerSelection("Madrid")}>
              Madrid
            </button>
          </div>
          <div>Your Answer: {selectedAnswer}</div>
          <div>Partner's Answer: {partnerAnswer}</div>
          <div>
            Result:{" "}
            {selectedAnswer && partnerAnswer
              ? selectedAnswer === partnerAnswer
                ? "Matched"
                : "Not Matched"
              : "Awaiting Answers"}
          </div>
        </div>
      ) : (
        <div>Waiting for someone to join the game...</div>
      )}
    </div>
  );
};

export default Game;
