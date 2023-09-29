import { useContext, useEffect } from "react";
import { GameContext } from "./context";

export const useInitialization = () => {
  const { setPeer } = useContext(GameContext);

  useEffect(() => {
    initializePeerConnection();
  }, []);

  const initializePeerConnection = async () => {
    const { default: Peer } = await import("peerjs");
    const myPeer = new Peer();
    myPeer.on("open", () => setPeer(myPeer));
    return () => myPeer.destroy();
  };

  return {
    initializePeerConnection,
  };
};
