import { GameContextType } from "@/hooks/context";
import { useMenu } from "@/hooks/useMenu";
import { useMobileBridge } from "@/hooks/useMobileBridge";
import { useStore } from "@/hooks/useStore";

type Payload = Pick<ReturnType<typeof useMenu>, "toggleShowStore"> &
  Pick<GameContextType, "products"> &
  Pick<ReturnType<typeof useMobileBridge>, "purchase"> &
  Pick<ReturnType<typeof useStore>, "isAvailableForPurhcase" | "getButtonText">;

export const StoreComponent = ({
  toggleShowStore,
  products,
  purchase,
  isAvailableForPurhcase,
  getButtonText,
}: Payload) => {
  return (
    <>
      <div className="title-bar">
        <button className="transparent-button" onClick={toggleShowStore}>
          <i className="fas fa-arrow-left back-button"></i>
        </button>
        <h1>Store</h1>
      </div>

      <div className="store-container">
        {products?.map((product) => {
          return (
            <div key={product.productId} className="product">
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
