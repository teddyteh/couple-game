import { GameContextType } from "@/hooks/context";
import { styles } from "../_styles";

type Payload = Pick<GameContextType, "products" | "availablePurchases">;

export const StoreComponent = ({ products, availablePurchases }: Payload) => {
  const hasPurchased = (productId: string) =>
    !availablePurchases.some((p) => p.productId === productId);

  return (
    <div className="score-container" style={styles.scoreContainer}>
      {products.map((product) => {
        return (
          <div key={product.productId}>
            <div>{product.productId}</div>
            <div>{product.description}</div>
            <div>{product.price}</div>
            <button disabled={hasPurchased(product.productId)}>Purchase</button>
          </div>
        );
      })}
    </div>
  );
};
