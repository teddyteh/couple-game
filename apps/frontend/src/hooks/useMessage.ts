import { useContext, useEffect } from "react";
import { GameContext } from "./context";

export const useMessage = () => {
  const { setProducts, setAvailablePurchases } = useContext(GameContext);

  useEffect(() => {
    const handleMessage = (event: any) => {
      console.log("Received message:", event.data);

      try {
        const { action, data } = JSON.parse(event.data);
        console.log("Parsed:", { action, data });

        switch (action) {
          case "products":
            setProducts(data);
            break;
          case "availablePurchases":
            setAvailablePurchases(data);
            break;
          default:
            console.warn("No action handler for:", action);
        }
      } catch (error) {
        console.error("Error parsing message data:", error);
      }
    };

    document.addEventListener("message", handleMessage);

    return () => {
      document.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    sendMessage({ action: "getProducts" });
    sendMessage({ action: "getAvailablePurchases" });
  }, []);

  const sendMessage = (data: { action: string; payload?: any }) => {
    window.ReactNativeWebView?.postMessage(JSON.stringify(data));
  };

  return {
    sendMessage,
  };
};
