import { Button } from "@/components/atoms/Button";
import styles from "./styles.module.css";

type Payload = { onClick: () => void; title: string };

export const TitleBar = ({ onClick, title }: Payload) => {
  return (
    <div className={styles.container}>
      <Button transparent onClick={onClick}>
        <i className="fas fa-arrow-left back-icon"></i>
      </Button>
      <h1>{title}</h1>
    </div>
  );
};
