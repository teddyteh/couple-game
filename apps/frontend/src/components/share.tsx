interface Payload {
  shareLink: string;
  hasCopiedShareLink: boolean;
  setHasCopiedShareLink: (hasCopied: boolean) => void;
  copyShareLink: () => void;
  isDemo: boolean;
}

export const ShareComponent = ({
  shareLink,
  hasCopiedShareLink,
  setHasCopiedShareLink,
  copyShareLink,
  isDemo = false,
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
    </>
  );
};
