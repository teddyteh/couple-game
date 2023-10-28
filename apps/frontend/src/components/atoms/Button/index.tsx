import { ReactNode } from "react";
import styles from "./styles.module.css";

type Payload = {
  children: ReactNode;
  compact?: boolean;
  disabled?: boolean;
  hasOuter?: boolean;
  isPurchase?: boolean;
  onClick?: () => void;
  transparent?: boolean;
};

export const Button = ({
  children,
  compact,
  disabled,
  hasOuter,
  isPurchase,
  onClick,
  transparent,
}: Payload) => {
  return (
    <div className={`${hasOuter && styles.buttonOuter} ${compact && styles.compact}`}>
      <button
        className={`${styles.defaultButton} ${
          transparent && styles.transparent
        } ${isPurchase && styles.purchase}`}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    </div>
  );
};
