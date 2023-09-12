import { useContext } from "react";
import { GameContext } from "./context";

export const useStore = () => {
  const { setIsShowingStore } = useContext(GameContext);

  const goToStore = () => setIsShowingStore(true);

  return {
    goToStore,
  };
};
