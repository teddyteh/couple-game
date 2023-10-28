import { Logo } from "@/components/atoms/Logo";
import { Footer } from "@/components/organisms/Footer";
import { ReactNode } from "react";
import styles from "./styles.module.css";

export const Screen = ({
  small,
  children,
}: {
  small: boolean;
  children: ReactNode;
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Logo small={small} />
      </div>
      <div className={styles.content}>{children}</div>
      <Footer small={small} />
    </div>
  );
};
