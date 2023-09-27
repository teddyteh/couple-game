import { ScreenComponent } from "./screen";

interface Payload {
  shareLink: string;
  hasCopiedShareLink: boolean;
  setHasCopiedShareLink: (hasCopied: boolean) => void;
  copyShareLink: () => void;
}

export const ShareComponent = ({ shareLink, hasCopiedShareLink, setHasCopiedShareLink, copyShareLink }: Payload) => {
  return (
    <ScreenComponent>
      <div className="share-container">
        <div className="content">
          <p>Share link via</p>
          <ul className="icons">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-whatsapp"></i>
            </a>
            <a href="#">
              <i className="fab fa-telegram-plane"></i>
            </a>
          </ul>
          <p>Or copy link</p>
          <div className="field">
            <i className="url-icon uil uil-link"></i>
            <input type="text" readOnly value={shareLink} />
            <button
              onClick={() => {
                copyShareLink();
                setHasCopiedShareLink(true);
              }}
            >
              {hasCopiedShareLink ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </ScreenComponent>
  );
};
