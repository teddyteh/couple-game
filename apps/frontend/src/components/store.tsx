import { GameContextType } from "@/hooks/context";
import { useMenu } from "@/hooks/useMenu";
import { useMobileBridge } from "@/hooks/useMobileBridge";
import { useStore } from "@/hooks/useStore";
import { TitleBar } from "./title-bar";

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
      <TitleBar onClick={toggleShowStore} title="Store" />

      <div className="store-container">
        {products?.map((product) => (
          <div key={product.productId} className="product">
            <h2 className="compact">{product.productId}</h2>
            <span>&quot;{product.description}&quot;</span>
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

      <p className="small">
        <i className="info-icon fas fa-info-circle" />
        Once you&apos;ve purchased a category pack, you&apos;ll be able to
        select it when you create a game. Questions are refreshed daily!
      </p>
    </>
  );
};
