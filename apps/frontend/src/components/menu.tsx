import { useLobby } from "@/hooks/useLobby";
import { useMenu } from "@/hooks/useMenu";
import { SKUS } from "@/pages/api/skus";
import { TitleBar } from "./title-bar";

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
              How to Play
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

    const removeBrackets = (text: string) =>
      text.replace(/\(.*?\)/g, "").trim();

    return (
      <>
        <TitleBar onClick={unsetCategorySelection} title="Select a category" />

        <div className="button-container">
          <div className="button-outer">
            <button
              className="default-button"
              onClick={() => createNewGame("couple-compatiblity")}
            >
              Couple Compatiblity
            </button>
          </div>

          {purchasedProducts.map((product) => {
            if (product.productId === SKUS.the_adviser) {
              return;
            }

            return (
              <div key={product.productId} className="button-outer">
                <button
                  className="default-button"
                  onClick={() => createNewGame(product.productId)}
                >
                  {removeBrackets(product.title)}
                </button>
              </div>
            );
          })}
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
