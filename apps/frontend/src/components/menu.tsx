import { useLobby } from "@/hooks/useLobby";
import { useMenu } from "@/hooks/useMenu";

type Payload = Pick<ReturnType<typeof useLobby>, "createNewGame"> &
  Pick<ReturnType<typeof useMenu>, "toggleShowStore" | "toggleShowHowToPlay"> &
  Pick<ReturnType<typeof useLobby>, "purchasedProducts"> & {
    shouldShowStore: boolean;
    isSelectingCategory: boolean;
    unsetCategorySelection: () => void;
    isShowingHowToPlay: boolean;
  };

export const MenuComponent = ({
  createNewGame,
  shouldShowStore,
  toggleShowStore,
  isSelectingCategory,
  unsetCategorySelection,
  purchasedProducts,
  toggleShowHowToPlay,
}: Payload) => {
  const renderMenu = () => {
    if (isSelectingCategory) {
      return;
    }

    return (
      <>
        <h1>Menu</h1>

        <div className="button-container">
          <div className="button-outer">
            <button className="default-button" onClick={() => createNewGame()}>
              Create Game
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
            <button className="default-button" onClick={toggleShowHowToPlay}>
              How to play?
            </button>
          </div>
        </div>
      </>
    );
  };

  const renderCategorySelection = () => {
    if (!isSelectingCategory) {
      return;
    }

    return (
      <>
        <div className="title-bar">
          <button
            className="transparent-button"
            onClick={unsetCategorySelection}
          >
            <i className="fas fa-arrow-left back-button"></i>
          </button>
          <h1>Select a category</h1>
        </div>

        <div className="button-container">
          <div className="button-outer">
            <button
              className="default-button"
              onClick={() => createNewGame("couple-compatiblity")}
            >
              Couple Compatiblity
            </button>
          </div>

          {purchasedProducts.map((product) => (
            <div key={product.productId} className="button-outer">
              <button
                className="default-button"
                onClick={() => createNewGame(product.productId)}
              >
                {product.title}
              </button>
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <>
      {renderMenu()}

      {renderCategorySelection()}
    </>
  );
};
