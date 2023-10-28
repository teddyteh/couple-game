import { GameContext } from "@/contexts/game";
import { useContext } from "react";

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
