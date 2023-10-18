import { Product } from "@/types/product";
import { useContext, useEffect } from "react";
import { GameContext } from "./context";
import { useAlert } from "./useAlert";

type Payload = Pick<ReturnType<typeof useAlert>, "showAlert">;

export const useMobileBridge = ({ showAlert }: Payload) => {
  const { setAvailablePurchases, setProducts } = useContext(GameContext);

  useEffect(() => {
    const handleMessage = (event: any) => {
      console.log("Message received from mobile client:", event.data);

      try {
        const { action, data } = JSON.parse(event.data);
        console.log("Parsed:", { action, data });

        switch (action) {
          case "storeData":
            const { products, availablePurchases } = data;
            setProducts(products);
            setAvailablePurchases(availablePurchases);
            break;
          case "currentPurchaseSuccess":
            console.info("currentPurchaseSuccess:", data); // {"code": "OK", "debugMessage": "", "message": "", "responseCode": 0}
            break;
          case "currentPurchaseError": {
            console.error("Current purchase error:", data);

            const { code } = data; // {"code": "E_USER_CANCELLED", "debugMessage": "", "message": "Payment is Cancelled.", "responseCode": 1}
            if (code !== "E_USER_CANCELLED") {
              showAlert();
            }
            break;
          }
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

  const sendMessage = (data: { action: string; payload?: any }) => {
    const webview = window.ReactNativeWebView;
    if (!webview) {
      return false;
    }

    webview.postMessage(JSON.stringify(data));

    return true;
  };

  const purchase = (product: Product) =>
    sendMessage({ action: "purchase", payload: { product } });

  return {
    purchase,
    sendMessage,
  };
};
