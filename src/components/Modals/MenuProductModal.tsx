import { ReactElement, useCallback, useState } from 'react';
import { ProductDto } from 'dtos/ProductDto';
import { Button } from 'components/Buttons/Button';
import { useLocalOrder } from 'context/OrderContext';
import PlaceHolderImage from 'assets/burger_transparent.png';
import { ModalTransition } from 'components/Transitions/ModalTransition';
import { GBPFormat } from 'utilities/GBPFormat';
import { PlusMinusButton } from 'components/Buttons/PlusMinusButton';

interface Props {
  product: ProductDto;
  showProductModal: boolean;
  disableShow: (isShow: boolean) => void;
}

export const MenuProductModal = ({ product, showProductModal, disableShow }: Props): ReactElement => {
  const { addToLocalOrder, removeProduct, localOrder } = useLocalOrder();

  const checkQuantity = (product: ProductDto): number => {
    const existingItem = localOrder.lineItems.find((item) => item.product.id === product.id);
    return existingItem ? existingItem.quantity : 1;
  };

  const [counter, setCounter] = useState(checkQuantity(product));

  const changeCount = (action: number): void => {
    if (counter + action >= 0) {
      setCounter(counter + action);
    }
  };

  const addToOrder = useCallback(() => {
    addToLocalOrder(product, counter);
  }, [addToLocalOrder, product, counter]);

  const allergens = ['Milk', 'Peanuts', 'Celery', 'Soy', 'Gluten'];

  return (
    <>
      {showProductModal && (
        <div
          data-testid="menu-product-modal"
          className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-75 shadow-sm"
          onClick={() => disableShow(false)}
        >
          <ModalTransition>
            <div
              className="flex w-[60vh] flex-col items-center rounded-2xl bg-white p-[20px] text-[#333F4C] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex w-full flex-row gap-[20px]">
                <img alt="burger" className="h-[18vh] w-[100%] rounded-[8px] object-cover" src={PlaceHolderImage} />
                <div className="flex w-full flex-col items-start justify-between gap-2">
                  <h5 className="text-[22px] font-[600]">{product.name}</h5>
                  <p className="font-poly text-left italic">{product.description}</p>
                  <div className="flex w-full items-center justify-between gap-2">
                    <div data-testid="product-attributes" className="font-[600]">
                      V, Ve, GF
                    </div>
                    <div className="flex items-center">
                      <PlusMinusButton action={-1} onClick={changeCount}></PlusMinusButton>
                      <div data-testid="quantity" className="mx-2 w-4">
                        {counter}
                      </div>
                      <PlusMinusButton data-testid="reduce-quantity" action={1} onClick={changeCount}></PlusMinusButton>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-[5%] flex w-full flex-col justify-items-start gap-[8px]">
                <div className="font-poly text-left text-[16px] font-[400] italic text-[#A2AAB6]">Contains Allergens</div>
                <div data-testid="allergens" className="flex flex-row justify-items-start gap-[16px] text-[14px]">
                  {allergens ? (
                    allergens.map((allergen) => <label key={allergen}>{allergen}</label>)
                  ) : (
                    <div>This product does not contain any allergens</div>
                  )}
                </div>
              </div>

              <div className="mt-[5%] flex flex-row gap-4 self-stretch rounded-lg">
                <Button
                  data-testid="cancel-button"
                  className="h-[45px] w-[40%] grow gap-2.5 border border-[#A2AAB6]"
                  colour="clear"
                  onClick={() => disableShow(false)}
                >
                  Cancel
                </Button>
                {counter > 0 ? (
                  <Button
                    onClick={() => {
                      addToOrder();
                      disableShow(false);
                    }}
                    colour="yellow"
                    className="h-[45px] w-[40%] grow gap-2.5"
                  >
                    Add to order {GBPFormat.format(product.price * counter)}
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      removeProduct(product);
                      disableShow(false);
                    }}
                    colour="yellow"
                    className="h-[45px] w-[40%] grow gap-2.5"
                  >
                    Remove from order
                  </Button>
                )}
              </div>
            </div>
          </ModalTransition>
        </div>
      )}
    </>
  );
};
