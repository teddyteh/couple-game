import { useContext } from "react";
import { GameContext } from "./context";

export const useMenu = () => {
  const { setIsShowingHowToPlay, setIsShowingStore } = useContext(GameContext);

  const toggleShowStore = () =>
    setIsShowingStore((previousValue) => !previousValue);

  const toggleShowHowToPlay = () =>
    setIsShowingHowToPlay((previousValue) => !previousValue);

  return {
    toggleShowStore,
    toggleShowHowToPlay,
  };
};
