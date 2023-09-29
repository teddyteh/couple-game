import { useContext } from "react";
import { GameContext } from "./context";
import { useRestart } from "./useRestart";

type Payload = Pick<ReturnType<typeof useRestart>, "restartGame">;

export const useMenu = () => {
  const { setIsShowingStore, setIsShowingHowToPlay } = useContext(GameContext);

  const toggleShowStore = () =>
    setIsShowingStore((previousValue) => !previousValue);

  const toggleShowHowToPlay = () =>
    setIsShowingHowToPlay((previousValue) => !previousValue);

  return {
    toggleShowStore,
    toggleShowHowToPlay,
  };
};
