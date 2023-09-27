import { useContext, useEffect } from "react";
import { GameContext } from "./context";

export const useInitialization = () => {
  const { setPeer } = useContext(GameContext);

  useEffect(() => {
    initializePeerConnection();
  }, []);

  const initializePeerConnection = () => {
    import("peerjs").then(({ default: Peer }) => {
      const myPeer = new Peer();
      myPeer.on("open", () => setPeer(myPeer));
      return () => myPeer.destroy();
    });
  };

  return {
    initializePeerConnection,
  };
};
