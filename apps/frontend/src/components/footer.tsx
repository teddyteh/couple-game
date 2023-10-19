import { AudioPlayerComponent } from "./audio-player";

type Payload = {
  small: boolean;
};

export const FooterComponent = ({ small }: Payload) => {
  return (
    <footer className={`footer ${small && "small"}`}>
      <div className={`audio-player-container ${small && "small"}`}>
        <AudioPlayerComponent />
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
