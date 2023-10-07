import { Product } from "@/types/product";
import { useContext } from "react";
import { GameContext } from "./context";

export const useStore = () => {
  const { setIsShowingStore, availablePurchases } = useContext(GameContext);

  const toggleShowStore = () =>
    setIsShowingStore((previousValue) => !previousValue);

  const isAvailableForPurhcase = (productId: string) => {
    if (availablePurchases.length === 0) {
      return true;
    }

    return !availablePurchases.some((p) => p.productId === productId);
  };

  const getButtonText = (product: Product) => {
    if (!isAvailableForPurhcase(product.productId)) {
      return "Purchased";
    }

    return `Purchase - ${product.price}`;
  };

  return {
    toggleShowStore,
    isAvailableForPurhcase,
    getButtonText,
  };
};
