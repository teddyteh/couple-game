import { useLobby } from "@/hooks/useLobby";
import { useStore } from "@/hooks/useStore";

type Payload = Pick<ReturnType<typeof useLobby>, "createNewGame"> &
  Pick<ReturnType<typeof useStore>, "toggleShowStore"> & {
    shouldShowStore: boolean;
  };

export const MenuComponent = ({
  createNewGame,
  shouldShowStore,
  toggleShowStore,
}: Payload) => {
  return (
    <>
      <h1>Menu</h1>

      <div className="button-container">
        <div className="button-outer">
          <button className="default-button" onClick={createNewGame}>
            Start
          </button>
        </div>
        {shouldShowStore && (
          <div className="button-outer">
            <button className="default-button" onClick={toggleShowStore}>
              Store
            </button>
          </div>
        )}
        <div className="button-outer">
          <button className="default-button">How to play?</button>
        </div>
      </div>
    </>
  );
};
