import { useContext, useEffect } from "react";
import { Alert, GameContext } from "./context";

export const useAlert = () => {
  const { alert, setAlert } = useContext(GameContext);

  useEffect(() => {
    let timerId: NodeJS.Timeout;
    if (alert !== null) {
      timerId = setTimeout(() => {
        setAlert(null);
      }, 5000);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [alert]);

  const showAlert = (
    alert: Alert = {
      title: "Holy Smokes!",
      message: "Something went wrong with that.",
    }
  ) => setAlert(alert);

  return {
    showAlert,
  };
};
