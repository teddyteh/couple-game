import { AudioPlayer } from "@/components/molecules/AudioPlayer";

type Payload = {
  small: boolean;
};

export const Footer = ({ small }: Payload) => {
  return (
    <footer className={`footer ${small && "small"}`}>
      <div className={`audio-player-container ${small && "small"}`}>
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
