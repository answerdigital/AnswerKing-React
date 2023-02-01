import { ReactElement, useCallback, useState } from 'react';
import { ProductDto } from 'dtos/ProductDto';
import { Button } from 'components/Button/Button';
import { useLocalOrder } from 'context/OrderContext';
import PlaceHolderImage from 'assets/burger_figma.png';

interface Props {
  product: ProductDto;
  showModal: boolean;
  disableShow: (isShow: boolean) => void;
}

export const MenuProductModal = ({ product, showModal, disableShow }: Props): ReactElement => {
  const { addToLocalOrder, removeProduct, localOrder } = useLocalOrder();

  const checkQuantity = (product: ProductDto): number => {
    const existingItem = localOrder.lineItems.find((item) => item.product.id === product.id);
    return existingItem ? existingItem.quantity : 1;
  };

  const [counter, setCounter] = useState(checkQuantity(product));
  const increase = (): void => {
    setCounter((counter) => counter + 1);
  };

  const decrease = (): void => {
    if (counter) {
      setCounter((counter) => counter - 1);
    }
  };

  const addToOrder = useCallback(() => {
    addToLocalOrder(product, counter);
  }, [addToLocalOrder, product, counter]);

  const allergens = ['Milk', 'Peanuts', 'Celery', 'Soy', 'Gluten'];

  return (
    <>
      {showModal ? (
        <>
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 outline-none focus:outline-none"
            onClick={() => disableShow(false)}
          >
            <div
              className="relative flex h-4/5 w-5/6 flex-col items-center justify-between rounded-2xl bg-white p-6 shadow-[0_4px_4px_rgba(0,0,0,0.25)] lg:h-fit lg:w-3/5 xl:w-[33%]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-row gap-4">
                <img alt="burger" className="h-[172.41px] w-[264px] grow rounded-[16px] p-2" src={PlaceHolderImage} />
                <div className="flex flex-col items-start gap-2 p-4">
                  <h5 className="font-poppins text-xl font-[600] text-[#333F4C]">{product.name}</h5>
                  <p className="font-poly text-left italic text-[#333F4C]">{product.description}</p>
                  <div className="flex w-full items-center justify-between gap-2">
                    <div className="font-semibold text-[#333F4C]">V, Ve, GF</div>
                    <div className="flex flex-row items-center justify-between gap-2 text-[#333F4C]">
                      <button className="flex h-10 w-10 items-center gap-3.5 rounded-md bg-[#E4EAEB] p-4" onClick={decrease}>
                        -
                      </button>
                      <div>{counter}</div>
                      <button className="flex h-10 w-10 items-center gap-3.5 rounded-md bg-[#E4EAEB] p-4" onClick={increase}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex w-full flex-col justify-items-start p-0">
                <div className="font-poly text-left text-base font-normal italic text-[#A2AAB6]">Contains Allergens</div>
                <div className="flex flex-row justify-items-start">
                  {allergens.map((allergen) => (
                    <>
                      <label key={allergen} className="gap-2 p-2 text-[#333F4C]">
                        {allergen}
                      </label>
                    </>
                  ))}
                </div>
              </div>

              <div className="flex flex-row gap-4 self-stretch rounded-lg p-0">
                <Button
                  className="gap-2.5py-4 flex h-[45px] w-[129.5px] grow items-center justify-center border-2 border-solid border-[#A2AAB6] px-3"
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
                    className="gap-2.5py-4 flex h-[45px] w-[129.5px] grow items-center justify-center px-3"
                  >
                    Add to order £{(product.price * counter * 1e2) / 1e2}
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      removeProduct(product);
                      disableShow(false);
                    }}
                    size="small"
                    colour="yellow"
                    className="gap-2.5py-4 flex h-[45px] w-[129.5px] grow items-center justify-center px-3"
                  >
                    Remove from order
                  </Button>
                )}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
