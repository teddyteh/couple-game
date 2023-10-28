import { GameContext } from "@/contexts/game";
import { Product } from "@/types/product";
import { useContext } from "react";

export const useStore = () => {
  const { availablePurchases, setIsShowingStore } = useContext(GameContext);

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

    return `Purchase ${product.localizedPrice}`;
  };

  return {
    toggleShowStore,
    isAvailableForPurchase,
    getButtonText,
  };
};
