import { useLobby } from "@/hooks/useLobby";
import { useMenu } from "@/hooks/useMenu";
import { useStore } from "@/hooks/useStore";

type Payload = Pick<ReturnType<typeof useLobby>, "createNewGame"> &
  Pick<ReturnType<typeof useMenu>, "toggleShowStore" | "toggleShowHowToPlay"> &
  Pick<ReturnType<typeof useStore>, "purchasedProducts"> & {
    isShowingStore: boolean;
    isSelectingCategory: boolean;
    isShowingHowToPlay: boolean;
  };

export const MenuComponent = ({
  createNewGame,
  isShowingStore,
  toggleShowStore,
  isSelectingCategory,
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
          {isShowingStore && (
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
        <h1>Select a category</h1>
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
