import { useLobby } from "@/hooks/useLobby";
import { useStore } from "@/hooks/useStore";

type Payload = Pick<ReturnType<typeof useLobby>, "createNewGame"> &
  Pick<ReturnType<typeof useStore>, "toggleShowStore" | "purchasedProducts"> & {
    shouldShowStore: boolean;
    isSelectingCategory: boolean;
  };

export const MenuComponent = ({
  createNewGame,
  shouldShowStore,
  toggleShowStore,
  isSelectingCategory,
}: // purchasedProducts,
Payload) => {
  const purchasedProducts = [{ productId: "adult", title: "Adult" }];

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
            <button className="default-button">How to play?</button>
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
