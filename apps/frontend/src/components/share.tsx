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
      <div className={`share-container ${!isDemo ? "full" : ""}`}>
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
    </>
  );
};
