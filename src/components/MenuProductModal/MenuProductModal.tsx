import { ReactElement, useCallback, useState } from 'react';
import { ProductDto } from 'dtos/ProductDto';
import { Button } from 'components/Button/Button';
import { useLocalOrder } from 'context/OrderContext';
import PlaceHolderImage from 'assets/burger_transparent.png';
import { RoundingPrice } from 'utilities/RoundingPriceFormat';

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
          className="fixed top-0 left-0 z-10 flex h-full w-full items-center justify-center bg-black bg-opacity-75 shadow-sm"
          onClick={() => disableShow(false)}
        >
          <div
            className="relative flex h-[50%] w-[30%] flex-col items-center justify-between rounded-2xl bg-white p-[24px] text-[#333F4C] shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex w-full flex-row justify-start gap-[20px] ">
              <img alt="burger" className="h-[25vh] w-[30vw] rounded-[16px] object-cover" src={PlaceHolderImage} />
              <div className="flex w-full flex-col items-start justify-between gap-2">
                <h5 className="text-[20px] font-[600]">{product.name}</h5>
                <p className="font-poly text-left italic">{product.description}</p>
                <div className="flex w-full items-center justify-between gap-2">
                  <div className="font-[600] ">V, Ve, GF</div>
                  <div className="flex flex-row items-center gap-2">
                    <button className="h-10 w-10 gap-3.5 rounded-md bg-[#E4EAEB]" onClick={() => changeCount(-1)}>
                      -
                    </button>
                    <div>{counter}</div>
                    <button className="h-10 w-10 gap-3.5 rounded-md bg-[#E4EAEB]" onClick={() => changeCount(1)}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col justify-items-start gap-[8px]">
              <div className="font-poly text-left text-[16px] font-[400] italic text-[#A2AAB6]">Contains Allergens</div>
              <div className="flex flex-row justify-items-start gap-[16px] text-[14px]">
                {allergens ? (
                  allergens.map((allergen) => (
                    <>
                      <label key={allergen}>{allergen}</label>
                    </>
                  ))
                ) : (
                  <div>This product does not contain any allergens</div>
                )}
              </div>
            </div>

            <div className="flex flex-row gap-4 self-stretch rounded-lg">
              <Button
                className="h-[45px] w-[129.5px] grow gap-2.5 border-2 border-solid border-[#A2AAB6] px-3"
                size="small"
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
                  size="small"
                  colour="yellow"
                  className="h-[45px] w-[129.5px] grow gap-2.5 px-3"
                >
                  Add to order £{RoundingPrice(product.price * counter)}
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    removeProduct(product);
                    disableShow(false);
                  }}
                  size="small"
                  colour="yellow"
                  className="h-[45px] w-[129.5px] grow gap-2.5 px-3"
                >
                  Remove from order
                </Button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
