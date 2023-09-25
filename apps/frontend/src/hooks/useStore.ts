import { useContext } from "react";
import { GameContext } from "./context";

export const useStore = () => {
  const { setIsShowingStore } = useContext(GameContext);

  const toggleShowStore = () =>
    setIsShowingStore((previousValue) => !previousValue);

  return {
    toggleShowStore,
  };
};
