import { useEffect } from "react";

export const useMessage = () => {
  useEffect(() => {
    const handleMessage = (event: any) => {
      console.log("Received message:", event.data);

      try {
        const { action, payload } = JSON.parse(event.data);
        console.log("Parsed:", { action, payload });

        switch (action) {
          case "products":
            console.log("Products:", payload);
            break;
          default:
            console.warn("No action handler for:", action);
        }
      } catch (error) {
        console.error("Error parsing message data:", error);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    sendMessage({ action: "getProducts" });
  }, []);

  const sendMessage = (data: { action: string; payload?: any }) => {
    postMessage(data);
  };

  return {
    sendMessage,
  };
};
