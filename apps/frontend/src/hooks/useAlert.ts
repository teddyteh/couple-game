import { useContext, useEffect, useRef } from "react";
import { GameContext } from "./context";

export const useAlert = () => {
  const { alert, setAlert } = useContext(GameContext);
  const callbackRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (alert !== null) {
      timerId = setTimeout(() => {
        setAlert(null);
        if (callbackRef.current) {
          callbackRef.current();
          callbackRef.current = null;
        }
      }, 5000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [alert]);

  const showAlert = (
    alertContent = {
      title: "Holy Smokes!",
      message: "Something went wrong with that.",
    },
    callback?: () => void
  ) => {
    setAlert(alertContent);
    if (callback) {
      callbackRef.current = callback;
    }
  };

  return {
    showAlert,
  };
};
