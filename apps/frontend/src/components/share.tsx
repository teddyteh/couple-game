import { useState } from "react";
import { ScreenComponent } from "./screen";

interface Payload {
  shareLink: string;
  copyShareLink: () => void;
}

export const ShareComponent = ({ shareLink, copyShareLink }: Payload) => {
  const [hasCopied, setHasCopied] = useState(false);

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
                setHasCopied(true);
              }}
            >
              {hasCopied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
      </div>
    </ScreenComponent>
  );
};
