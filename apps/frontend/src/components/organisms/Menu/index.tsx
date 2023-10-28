import { Button } from "@/components/atoms/Button";
import { ButtonContainer } from "@/components/molecules/ButtonContainer";
import { TitleBar } from "@/components/molecules/TitleBar";
import { useLobby } from "@/hooks/useLobby";
import { useMenu } from "@/hooks/useMenu";
import { SKUS } from "@/pages/api/skus";

type Payload = Pick<ReturnType<typeof useLobby>, "createNewGame"> &
  Pick<ReturnType<typeof useMenu>, "toggleShowStore" | "toggleShowHowToPlay"> &
  Pick<ReturnType<typeof useLobby>, "purchasedProducts"> & {
    shouldShowStore: boolean;
    isSelectingCategory: boolean;
    unsetCategorySelection: () => void;
    isShowingHowToPlay: boolean;
  };

export const Menu = ({
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

        <ButtonContainer>
          <Button hasOuter onClick={() => createNewGame()}>
            Create Game
          </Button>
          {shouldShowStore && (
            <Button hasOuter onClick={toggleShowStore}>
              Store
            </Button>
          )}
          <Button hasOuter onClick={toggleShowHowToPlay}>
            How to Play
          </Button>
        </ButtonContainer>
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

        <ButtonContainer>
          <Button hasOuter onClick={() => createNewGame("couple-compatiblity")}>
            Couple Compatiblity
          </Button>

          {purchasedProducts.map((product) => {
            if (product.productId === SKUS.the_adviser) {
              return;
            }

            return (
              <Button
                key={product.productId}
                hasOuter
                onClick={() => createNewGame(product.productId)}
              >
                {removeBrackets(product.title)}
              </Button>
            );
          })}
        </ButtonContainer>
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
