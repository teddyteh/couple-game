import { useContext, useEffect, useRef } from "react";
import { GameContext } from "./context";

const CLEAR_TIMEOUT_AFTER_MS = 1500;

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
      }, CLEAR_TIMEOUT_AFTER_MS);
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
