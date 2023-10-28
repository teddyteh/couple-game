import { GameContextType } from "@/contexts/game";
import { useLobby } from "@/hooks/useLobby";
import styles from "./styles.module.css";

type Payload = Pick<
  GameContextType,
  "hasCopiedShareLink" | "setHasCopiedShareLink"
> &
  Pick<ReturnType<typeof useLobby>, "copyShareLink"> & {
    shareLink: string;
    shouldShowStore: boolean;
  };

export const Share = ({
  shareLink,
  hasCopiedShareLink,
  copyShareLink,
  shouldShowStore,
}: Payload) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.inner}>
          <p>Share this link with a friend:</p>
          <div className={styles.copyContainer}>
            <i className={`${styles.urlIcon} uil uil-link`}></i>
            <input
              className={styles.copyText}
              type="text"
              readOnly
              value={shareLink}
            />
            <button
              className={styles.copyButton}
              onClick={() => copyShareLink()}
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
