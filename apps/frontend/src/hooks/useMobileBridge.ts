import { Product } from "@/types/product";
import { useContext, useEffect } from "react";
import { GameContext } from "./context";
import { useAlert } from "./useAlert";

type Payload = Pick<ReturnType<typeof useAlert>, "showAlert">;

export const useMobileBridge = ({ showAlert }: Payload) => {
  const { setProducts, setAvailablePurchases } = useContext(GameContext);

  useEffect(() => {
    const handleMessage = (event: any) => {
      console.log("Message received from mobile client:", event.data);

      try {
        const { action, data } = JSON.parse(event.data);
        console.log("Parsed:", { action, data });

        switch (action) {
          case "ready":
            _sendMessage({ action: "getProducts" });
            _sendMessage({ action: "getAvailablePurchases" });
            alert("ready")
            break;
          case "products":
            setProducts(data);
            alert("products")
            break;
          case "availablePurchases":
            setAvailablePurchases(data);
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

  // useEffect(() => {
  //   if (products || availablePurchases) {
  //     return;
  //   }

  //   setTimeout(() => {
  //     _sendMessage({ action: "getProducts" });
  //     _sendMessage({ action: "getAvailablePurchases" });
  //   }, 1500);
  // }, [products, availablePurchases]);

  const _sendMessage = (data: { action: string; payload?: any }) =>
    window.ReactNativeWebView?.postMessage(JSON.stringify(data));

  const purchase = (product: Product) =>
    _sendMessage({ action: "purchase", payload: { product } });

  return {
    purchase,
  };
};
