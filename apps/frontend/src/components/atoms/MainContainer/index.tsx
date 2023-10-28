import { ReactNode } from "react";
import styles from "./styles.module.css";

export const MainContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>{children}</div>
    </div>
  );
};
