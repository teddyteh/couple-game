import { GameContextType } from "@/hooks/context";
import { useMobileBridge } from "@/hooks/useMobileBridge";
import { useStore } from "@/hooks/useStore";

type Payload = Pick<GameContextType, "products"> &
  Pick<ReturnType<typeof useMobileBridge>, "purchase"> &
  Pick<ReturnType<typeof useStore>, "isAvailableForPurhcase" | "getButtonText">;

export const StoreComponent = ({
  products,
  purchase,
  isAvailableForPurhcase,
  getButtonText,
}: Payload) => {
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
