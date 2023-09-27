import { AudioPlayerComponent } from "./audio-player";

export const FooterComponent = () => {
  return (
    <footer className="footer">
      <div className="audio-player-container">
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
