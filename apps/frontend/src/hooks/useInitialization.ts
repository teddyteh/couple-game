import { useContext, useEffect } from "react";
import { GameContext } from "./context";

const DUMMY_QUESTIONS = [
  {
    question: "What is your favorite color?",
    options: ["Red", "Blue", "Green", "Yellow"],
  },
  {
    question: "What is your favorite animal?",
    options: ["Dog", "Cat", "Bird", "Fish"],
  },
];

export const useInitialization = () => {
  const { setPeer, setQuestions } = useContext(GameContext);

  useEffect(() => {
    initializePeerConnection();
  }, []);

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

  const fetchQuestionsFromURL = async () => {
    try {
      const response = await fetch(
        "https://d101rsr8tfejfu.cloudfront.net/couple-compatibility.json"
      );
      const data = await response.json();
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setQuestions(DUMMY_QUESTIONS);
    }
  };

  return {
    initializePeerConnection,
    fetchQuestionsFromURL,
  };
};
