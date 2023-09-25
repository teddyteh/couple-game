import { useConnectionManagement } from "@/hooks/useConnectionManagement";
import { useStore } from "@/hooks/useStore";
import { ScreenComponent } from "./screen";

type Payload = Pick<
  ReturnType<typeof useConnectionManagement>,
  "createNewGame"
> &
  Pick<ReturnType<typeof useStore>, "toggleShowStore"> & {
    shouldShowStore: boolean;
  };

export const MenuComponent = ({
  createNewGame,
  shouldShowStore,
  toggleShowStore,
}: Payload) => {
  return (
    <ScreenComponent>
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
    </ScreenComponent>
  );
};
