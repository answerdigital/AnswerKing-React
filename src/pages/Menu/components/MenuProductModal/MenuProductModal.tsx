import { ReactElement, useCallback, useState } from 'react';
import Button from 'common/Buttons/Button';
import PlusMinusButton from 'common/Buttons/PlusMinusButton';
import ModalTransition from 'common/Transitions/ModalTransition';
import { useLocalOrder } from 'context/OrderContext';
import { ProductDto } from 'dtos/Product/ProductDto';
import GBPFormat from 'utilities/GBPFormat';
import PlaceHolderImage from '/images/burger_transparent.png';

interface Props {
  product: ProductDto;
  showProductModal: boolean;
  disableShow: (isShow: boolean) => void;
}

export default function MenuProductModal({ product, showProductModal, disableShow }: Props): ReactElement {
  const { addToLocalOrder, removeProduct, localOrder } = useLocalOrder();

  const checkQuantity = (): number => {
    const existingItem = localOrder.lineItems.find((item) => item.product.id === product.id);
    return existingItem ? existingItem.quantity : 1;
  };

  const [counter, setCounter] = useState(checkQuantity());

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
    <div>
      {showProductModal && (
        <div
          data-testid="menu-product-modal"
          className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-75 shadow-sm"
          onClick={() => disableShow(false)}
          onKeyDown={() => disableShow(false)}
          role="button"
          tabIndex={0}
        >
          <ModalTransition>
            <div
              className="text-ak-grey-1 flex w-[60vh] flex-col items-center rounded-2xl bg-white p-[20px] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => e.stopPropagation()}
              role="button"
              tabIndex={0}
            >
              <div className="flex w-full flex-row gap-[20px]">
                <img alt="burger" className="h-[18vh] w-[100%] rounded-[8px] object-cover" src={PlaceHolderImage} />
                <div className="flex w-full flex-col items-start justify-between gap-2">
                  <h5 className="text-xl font-semibold">{product.name}</h5>
                  <p className="font-poly text-left italic">{product.description}</p>
                  <div className="flex w-full items-center justify-between gap-2">
                    <div data-testid="product-attributes" className="font-semibold">
                      V, Ve, GF
                    </div>
                    <div className="flex items-center">
                      <PlusMinusButton action={-1} onClick={changeCount} />
                      <div data-testid="quantity" className="mx-2 w-4">
                        {counter}
                      </div>
                      <PlusMinusButton data-testid="reduce-quantity" action={1} onClick={changeCount} />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-[5%] flex w-full flex-col justify-items-start gap-[8px]">
                <div className="font-poly text-ak-grey-4 text-left text-base font-normal italic">Contains Allergens</div>
                <div data-testid="allergens" className="flex flex-row justify-items-start gap-[16px] text-sm">
                  {allergens ? (
                    allergens.map((allergen) => (
                      <label htmlFor="allergen" key={allergen}>
                        {allergen}
                      </label>
                    ))
                  ) : (
                    <div>This product does not contain any allergens</div>
                  )}
                </div>
              </div>

              <div className="mt-[5%] flex flex-row gap-4 self-stretch rounded-lg">
                <Button
                  data-testid="cancel-button"
                  className="border-ak-grey-4 h-[45px] w-[40%] grow gap-2.5 border"
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
    </div>
  );
}
