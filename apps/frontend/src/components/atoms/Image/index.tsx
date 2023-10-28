import styles from "./styles.module.css";

type Payload = {
  src: string;
  alt: string;
  small: boolean;
};

export const Image = ({ src, alt, small }: Payload) => {
  return (
    <div className={styles.container}>
      <img className={`${styles.image} ${small && "small"}`} src={src} alt={alt} />
    </div>
  );
};
