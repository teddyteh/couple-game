import { GameContextType } from "@/hooks/context";
import { useMenu } from "@/hooks/useMenu";
import { useMobileBridge } from "@/hooks/useMobileBridge";
import { useStore } from "@/hooks/useStore";

type Payload = Pick<ReturnType<typeof useMenu>, "toggleShowStore"> &
  Pick<GameContextType, "products"> &
  Pick<ReturnType<typeof useMobileBridge>, "purchase"> &
  Pick<ReturnType<typeof useStore>, "isAvailableForPurchase" | "getButtonText">;

export const StoreComponent = ({
  toggleShowStore,
  products,
  purchase,
  isAvailableForPurchase,
  getButtonText,
}: Payload) => {
  return (
    <>
      <div className="title-bar">
        <button className="transparent-button" onClick={toggleShowStore}>
          <i className="fas fa-arrow-left back-button" />
        </button>
        <h1>Store</h1>
      </div>

      <p>
        <i className="info-icon fas fa-info-circle" />
        Once you've purchased a category pack, you'll be able to select it when
        you create a game. Questions are refreshed daily!
      </p>

      <div className="store-container">
        {products?.map((product) => (
          <div key={product.productId} className="product">
            <div>{product.productId}</div>
            <div>&quot;{product.description}&quot;</div>
            <button
              className="default-button purchase-button"
              onClick={() => purchase(product)}
              disabled={!isAvailableForPurchase(product.productId)}
            >
              {getButtonText(product)}
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
