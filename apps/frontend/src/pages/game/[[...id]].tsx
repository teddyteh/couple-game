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
  const [questions, setQuestions] = useState<
    Array<{ question: string; options: string[] }>
  >([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [partnerAnswers, setPartnerAnswers] = useState<string[]>([]);
  const [isPlayerFinished, setIsPlayerFinished] = useState<boolean>(false);
  const [isPartnerFinished, setIsPartnerFinished] = useState<boolean>(false);

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
    fetchQuestionsFromURL();
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

  const fetchQuestionsFromURL = async () => {
    try {
      // const response = await fetch("YOUR_QUESTIONS_URL_HERE");
      // const data = await response.json();
      setQuestions([
        {
          question: "What is your favorite color?",
          options: ["Red", "Blue", "Green", "Yellow"],
        },
        {
          question: "What is your favorite animal?",
          options: ["Dog", "Cat", "Bird", "Fish"],
        },
      ]);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
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
    let newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answer;

    setSelectedAnswers(newAnswers);

    if (conn) conn.send({ answers: newAnswers });

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else {
      setIsPlayerFinished(true);
      if (conn) conn.send({ finished: true });
    }
  };

  const calculateResults = () => {
    let matchCount = 0;
    selectedAnswers.forEach((answer, index) => {
      if (answer && partnerAnswers[index] && answer === partnerAnswers[index]) {
        matchCount += 1;
      }
    });
    return { matchCount, total: questions.length };
  };

  const calculateCompatibilityScore = () => {
    const results = calculateResults();
    return ((results.matchCount / results.total) * 100).toFixed(2);
  };

  const generateResultDetails = () => {
    let resultDetails: {
      question: string;
      yourAnswer: string;
      partnerAnswer: string;
    }[] = [];
    selectedAnswers.forEach((answer, index) => {
      if (answer && partnerAnswers[index] && answer !== partnerAnswers[index]) {
        resultDetails.push({
          question: questions[index].question,
          yourAnswer: answer,
          partnerAnswer: partnerAnswers[index],
        });
      }
    });
    return resultDetails;
  };

  const renderUnmatchedAnswers = () => {
    const resultDetails = generateResultDetails();
    console.log("resultDetails", resultDetails);
    return resultDetails.map((detail, index) => (
      <div key={index}>
        <div>Question: {detail.question}</div>
        <div>Your Answer: {detail.yourAnswer}</div>
        <div>Partner's Answer: {detail.partnerAnswer}</div>
      </div>
    ));
  };

  return (
    <div>
      Game ID: {gameId}
      
      {!isGameStarted ? (
        <div>Waiting for someone to join the game...</div>
      ) : null}

      {isGameStarted &&
      !isPlayerFinished &&
      questions.length > 0 &&
      currentQuestionIndex < questions.length ? (
        <div>
          <div>Question: {questions[currentQuestionIndex].question}</div>
          <div>
            {questions[currentQuestionIndex].options.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswerSelection(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      {isGameStarted &&
      isPlayerFinished &&
      currentQuestionIndex === questions.length - 1 ? (
        <div>Waiting for the other player to finish...</div>
      ) : null}

      {isGameStarted &&
      isPlayerFinished &&
      isPartnerFinished &&
      currentQuestionIndex === questions.length - 1 ? (
        <div>
          <div>
            Result: Matched answers: {calculateResults().matchCount} out of{" "}
            {questions.length}
          </div>
          <div>Compatibility Score: {calculateCompatibilityScore()}%</div>
          {renderUnmatchedAnswers()}
        </div>
      ) : null}
    </div>
  );
};

export default Game;
