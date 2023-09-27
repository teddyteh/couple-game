import { GameContextType } from "@/hooks/context";
import { useMobileBridge } from "@/hooks/useMobileBridge";
import { Product } from "@/types/product";

type Payload = Pick<GameContextType, "products" | "availablePurchases"> &
  Pick<ReturnType<typeof useMobileBridge>, "purchase">;

export const StoreComponent = ({
  products,
  availablePurchases,
  purchase,
}: Payload) => {
  const isAvailableForPurhcase = (productId: string) =>
    availablePurchases?.some((p) => p.productId === productId);

  const getButtonText = (product: Product) => {
    if (!isAvailableForPurhcase(product.productId)) {
      return "Purchased";
    }

    return `Purchase - ${product.price}`;
  };
  return (
    <>
      <h1>Store</h1>

      <div className="score-container">
        {products?.map((product) => {
          return (
            <div key={product.productId}>
              <div>{product.productId}</div>
              <div>&quot;{product.description}&quot;</div>
              <button
                className="purchase-button"
                onClick={() => purchase(product)}
                disabled={!isAvailableForPurhcase(product.productId)}
              >
                {getButtonText(product)}
              </button>
            </div>
          );
        })}
      </div>
    </>
  );
};
