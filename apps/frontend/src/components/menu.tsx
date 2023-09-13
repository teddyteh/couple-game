import { ScreenComponent } from "./screen";

type Payload = {
  createNewGame: () => void;
  goToStore: () => void;
};

export const MenuComponent = ({ createNewGame, goToStore }: Payload) => {
  return (
    <ScreenComponent>
      <h1>Menu</h1>

      <div className="button-container">
        <div className="button-outer">
          <button className="default-button" id="start" onClick={createNewGame}>
            Start
          </button>
        </div>
        <div className="button-outer">
          <button
            className="default-button"
            id="go-to-store"
            onClick={goToStore}
          >
            Store
          </button>
        </div>
        <div className="button-outer">
          <button className="default-button" id="how-to-play">
            How to play?
          </button>
        </div>
      </div>
    </ScreenComponent>
  );
};
