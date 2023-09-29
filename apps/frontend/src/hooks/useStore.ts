import { Product } from "@/types/product";
import { useContext } from "react";
import { GameContext } from "./context";

export const useStore = () => {
  const { setIsShowingStore, availablePurchases, products } =
    useContext(GameContext);

  const toggleShowStore = () =>
    setIsShowingStore((previousValue) => !previousValue);

  const isAvailableForPurhcase = (productId: string) =>
    availablePurchases?.some((p) => p.productId === productId);

  const getButtonText = (product: Product) => {
    if (!isAvailableForPurhcase(product.productId)) {
      return "Purchased";
    }

    return `Purchase - ${product.price}`;
  };

  const purchasedProducts = products.filter(
    (product) =>
      !availablePurchases?.some((p) => p.productId === product.productId)
  );

  return {
    toggleShowStore,
    isAvailableForPurhcase,
    getButtonText,
    purchasedProducts,
  };
};
