import { ScreenComponent } from "./screen";

interface Payload {
  shareLink: string;
  hasCopiedShareLink: boolean;
  setHasCopiedShareLink: (hasCopied: boolean) => void;
  copyShareLink: () => void;
}

export const ShareComponent = ({
  shareLink,
  hasCopiedShareLink,
  setHasCopiedShareLink,
  copyShareLink,
}: Payload) => {
  return (
    <ScreenComponent>
      <div className="share-container">
        <div className="content">
          <p>Share this link with a friend:</p>
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
