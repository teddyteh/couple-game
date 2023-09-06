import { useRouter } from "next/router";
import { DataConnection, Peer } from "peerjs";
import { CSSProperties, useEffect, useState } from "react";

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
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
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

  const handleAnswerSelection = (answer: string) => setSelectedOption(answer);

  const handleNextButtonClick = () => {
    if (!selectedOption) return;

    // Save answers
    let newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = selectedOption;
    setSelectedAnswers(newAnswers);
    if (conn) conn.send({ answers: newAnswers });

    // Go to next question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedOption(null);
    } else {
      // No more questions
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
    <div style={styles.container}>
      <div id="display-container" style={styles.displayContainer}>
        {!isGameStarted && <div>Waiting for someone to join the game...</div>}

        {isGameStarted && !isPlayerFinished && (
          <>
            <div className="header" style={styles.header}>
              <div className="number-of-count">
                <span className="number-of-question">
                  {currentQuestionIndex + 1} of {questions.length} questions
                </span>
              </div>
              <div className="timer-div" style={styles.timerDiv}>
                <img
                  src="https://uxwing.com/wp-content/themes/uxwing/download/time-and-date/stopwatch-icon.png"
                  width="20px"
                  alt="Timer Icon"
                />
                <span className="time-left">10s</span>
              </div>
            </div>

            <div id="container" style={styles.containerDiv}>
              {isGameStarted &&
              questions.length > 0 &&
              currentQuestionIndex < questions.length ? (
                <>
                  <div className="question" style={styles.question}>
                    {questions[currentQuestionIndex].question}
                  </div>
                  <div style={styles.options}>
                    {questions[currentQuestionIndex].options.map((option) => (
                      <button
                        key={option}
                        className={`option-div ${
                          selectedOption === option ? "selected" : ""
                        }`}
                        style={
                          selectedOption === option
                            ? {
                                ...styles.optionDiv,
                                ...styles.selectedOptionDiv,
                              }
                            : styles.optionDiv
                        }
                        onClick={() => handleAnswerSelection(option)}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </>
              ) : null}
              {isGameStarted &&
              !isPlayerFinished &&
              questions.length > 0 &&
              currentQuestionIndex < questions.length ? (
                <button
                  id="next-button"
                  style={
                    !selectedOption
                      ? { ...styles.nextButton, ...styles.disabledNextButton }
                      : styles.nextButton
                  }
                  onClick={handleNextButtonClick}
                >
                  Next
                </button>
              ) : null}
            </div>
          </>
        )}

        {isGameStarted && isPlayerFinished && (
          <div>Waiting for the other player to finish...</div>
        )}

        {isGameStarted && isPlayerFinished && isPartnerFinished && (
          <div className="score-container" style={styles.scoreContainer}>
            <div id="user-score" style={styles.userScore}>
              Score: {calculateCompatibilityScore()}%
            </div>
            {renderUnmatchedAnswers()}
            <button
              id="restart"
              style={styles.restartButton}
              // onClick={}
            >
              Restart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Source: https://codingtorque.com/quiz-app-using-javascript/
const styles: { [key: string]: CSSProperties } = {
  container: {
    padding: 0,
    margin: 0,
    boxSizing: "border-box",
    fontFamily: '"Poppins", sans-serif',
    height: "100vh",
    background: "linear-gradient(184deg,#8754ff,#8E2DE2)",
    position: "relative",
  },
  displayContainer: {
    backgroundColor: "#ffffff",
    padding: "3.1em 1.8em",
    width: "80%",
    maxWidth: "37.5em",
    margin: "0 auto",
    position: "absolute",
    transform: "translate(-50%, -50%)",
    top: "50%",
    left: "50%",
    borderRadius: "0.6em",
  },
  header: {
    marginBottom: "1.8em",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "0.6em",
    borderBottom: "0.1em solid #c0bfd2",
  },
  timerDiv: {
    backgroundColor: "#e1f5fe",
    width: "7.5em",
    borderRadius: "1.8em",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0.7em 1.8em",
  },
  containerDiv: {
    marginBottom: "1.25em",
    fontWeight: 600,
  },
  question: {
    marginBottom: "1.25em",
    fontWeight: 600,
  },
  options: {
    display: "flex",
    flexDirection: "column",
  },
  optionDiv: {
    fontSize: "0.9em",
    width: "100%",
    padding: "1em",
    margin: "0.3em 0",
    textAlign: "left",
    outline: "none",
    backgroundColor: "transparent",
    border: "1px solid #c0bfd2",
    borderRadius: "0.3em",
    cursor: "pointer",
  },
  selectedOptionDiv: {
    backgroundColor: "#f0f0f0",
  },
  nextButton: {
    fontSize: "1em",
    marginTop: "1.5em",
    backgroundColor: "#8754ff",
    color: "#ffffff",
    padding: "0.7em 1.8em",
    borderRadius: "0.3em",
    float: "right",
    boxShadow: "0px 20px 40px rgba(0, 0, 0, 0.3)",
    border: "none",
    cursor: "pointer",
  },
  disabledNextButton: {
    backgroundColor: "#c0bfd2",
    cursor: "not-allowed",
  },
  scoreContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  userScore: {
    fontSize: "1.5em",
    color: "#ffffff",
  },
  restartButton: {
    fontSize: "1.3em",
    padding: "0.5em 1.8em",
    borderRadius: "0.2em",
    boxShadow: "0 20px 30px rgba(0, 0, 0, 0.4)",
    marginTop: "0.9em",
    border: "none",
    cursor: "pointer",
  },
};

export default Game;
