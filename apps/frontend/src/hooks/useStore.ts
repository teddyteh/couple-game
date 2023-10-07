import { Product } from "@/types/product";
import { useContext } from "react";
import { GameContext } from "./context";

export const useStore = () => {
  const { setIsShowingStore, availablePurchases } = useContext(GameContext);

  const toggleShowStore = () =>
    setIsShowingStore((previousValue) => !previousValue);

  const isAvailableForPurchase = (productId: string) => {
    if (availablePurchases.length === 0) {
      return true;
    }

    return !availablePurchases.some((p) => p.productId === productId);
  };

  const getButtonText = (product: Product) => {
    if (!isAvailableForPurchase(product.productId)) {
      return "Purchased";
    }

    return `Purchase - ${product.price}`;
  };

  return {
    toggleShowStore,
    isAvailableForPurchase,
    getButtonText,
  };
};
