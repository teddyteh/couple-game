import { GameContext } from "@/contexts/game";
import { useContext, useEffect } from "react";

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
