import { useContext, useEffect } from "react";
import { GameContext } from "./context";

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

  return {
    initializePeerConnection,
    fetchQuestionsFromURL,
  };
};
