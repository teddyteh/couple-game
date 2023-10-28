import { AudioPlayer } from "@/components/molecules/AudioPlayer";
import styles from './styles.module.css';

type Payload = {
  small: boolean;
};

export const Footer = ({ small }: Payload) => {
  return (
    <footer className={`${styles.container} ${small && "small"}`}>
      <div className={`${styles.audioPlayerContainer} ${small && styles.small}`}>
        <AudioPlayer />
      </div>
      <div>
        Made in{" "}
        <a target="blank" href="https://teddyteh.com">
          Teddy
        </a>
      </div>
    </footer>
  );
};
