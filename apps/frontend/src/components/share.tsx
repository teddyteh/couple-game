import { GameContextType } from "@/hooks/context";

type Payload = Pick<
  GameContextType,
  "hasCopiedShareLink" | "setHasCopiedShareLink"
> & {
  shareLink: string;
  copyShareLink: () => void;
  shouldShowStore: boolean;
};

export const ShareComponent = ({
  shareLink,
  hasCopiedShareLink,
  setHasCopiedShareLink,
  copyShareLink,
  shouldShowStore,
}: Payload) => {
  return (
    <>
      <div className="share-container">
        <div className="inner">
          <p>Share this link with a friend:</p>
          <div className="copy-container">
            <i className="url-icon uil uil-link"></i>
            <input
              className="copy-text"
              type="text"
              readOnly
              value={shareLink}
            />
            <button
              className="copy-button"
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

      {shouldShowStore && (
        <p className="small">
          <i className="info-icon fas fa-info-circle" />
          For more categories, purchase them at the store (app only).
        </p>
      )}
    </>
  );
};
