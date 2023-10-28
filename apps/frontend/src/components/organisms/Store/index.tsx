import { Button } from "@/components/atoms/Button";
import { TitleBar } from "@/components/molecules/TitleBar";
import { GameContextType } from "@/contexts/game";
import { useMenu } from "@/hooks/useMenu";
import { useMobileBridge } from "@/hooks/useMobileBridge";
import { useStore } from "@/hooks/useStore";
import styles from "./styles.module.css";

type Payload = Pick<ReturnType<typeof useMenu>, "toggleShowStore"> &
  Pick<GameContextType, "products"> &
  Pick<ReturnType<typeof useMobileBridge>, "purchase"> &
  Pick<ReturnType<typeof useStore>, "isAvailableForPurchase" | "getButtonText">;

export const Store = ({
  toggleShowStore,
  products,
  purchase,
  isAvailableForPurchase,
  getButtonText,
}: Payload) => {
  return (
    <>
      <TitleBar onClick={toggleShowStore} title="Store" />

      <div className={styles.container}>
        {products?.map((product) => (
          <div key={product.productId} className={styles.product}>
            <h2 className="compact">{product.productId.replace("_", " ")}</h2>
            <span>&quot;{product.description}&quot;</span>
            <Button
              isPurchase
              onClick={() => purchase(product)}
              disabled={!isAvailableForPurchase(product.productId)}
            >
              {getButtonText(product)}
            </Button>
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
