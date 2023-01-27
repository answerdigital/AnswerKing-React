import { ReactElement, useCallback, useState } from 'react';
import { ProductDto } from 'dtos/ProductDto';
import { Button } from 'components/Button/Button';
import { useLocalOrder } from 'context/OrderContext';
import PlaceHolderImage from 'assets/burger_figma.png';
import { CheckBoxIcon } from 'components/Icons/CheckBoxIcon';

interface Props {
  product: ProductDto;
  disableShow: (isShow: boolean) => void;
}

export const MenuProductModal = ({ product, disableShow }: Props): ReactElement => {
  const { addToLocalOrder, removeProduct, localOrder } = useLocalOrder();
  const checkQuantity = (product: ProductDto): number => {
    const existingItem = localOrder.lineItems.find((item) => item.product.id === product.id);
    return existingItem ? existingItem.quantity: 1;
  };
  const [counter, setCounter] = useState(checkQuantity(product));
  const increase = (): void => {
    setCounter((counter) => counter + 1);
  };
  const decrease = (): void => {
    counter == 0 ? null : setCounter((counter) => counter - 1);
  };

  const addToOrder = useCallback(() => {
    addToLocalOrder(product, counter);
  }, [addToLocalOrder, product, counter]);

  // const ingredients = ['Patty', 'Bun', 'Lettuce', 'Ketchup', 'Hummus', 'Tahini'];
  // const addOns = ['Patty', 'Olives', 'Tofu', 'Hummus', 'Tahini'];
  const allergens = ['Milk', 'Peanuts', 'Celery', 'Soy', 'Gluten'];



  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-auto"  onClick={() => disableShow(false)} >
        <div className="relative mb-7 flex w-5/12 min-h-5/6 flex-col items-center justify-between gap-2 rounded-2xl bg-white p-6 shadow-[0_4px_4px_rgba(0,0,0,0.25)]"
          onClick={e => e.stopPropagation()}>
          <div className="flex flex-row gap-6">
            <img alt="burger" className="h-[172.41px] min-w-[264px] grow rounded-lg" src={PlaceHolderImage} />
            <div className="flex flex-col items-start gap-2 p-4">
              <h5 className="font-poppins text-xl font-semibold text-[#333F4C]">{product.name}</h5>
              <p className="font-poppins text-left text-[#333F4C]">{product.description}</p>
              <div className="flex w-full items-center justify-between gap-2">
                <div className="font-poppins font-semibold text-[#333F4C]">V, Ve, GF</div>
                <div className="font-poppins flex flex-row items-center justify-between gap-2 text-[#333F4C]">
                  <button className="bg-[#E4EAEB] flex items-center gap-3.5 rounded-md p-4 w-10 h-10" onClick={decrease}>
                    -
                  </button>
                  <div>{counter}</div>
                  <button className="bg-[#E4EAEB] flex items-center gap-3.5 rounded-md p-4 w-10 h-10"  onClick={increase}>
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Ingredients and AddOns
          <div className="flex flex-col w-full justify-items-start p-0 gap-2">
            <div className="font-poly italic font-normal text-base text-left text-[#A2AAB6]">Ingredients</div>
            <div className="flex flex-row flex-wrap justify-items-start">
              {ingredients.map((ingredient) => (
                <>
                  <CheckBoxIcon checked={true} />
                  <label key={ingredient} className="text-[#333F4C] gap-2 p-2">
                    {ingredient}
                  </label>
                </>
              ))}
            </div>
          </div>
          <div className="flex flex-col w-full justify-items-start p-0 gap-2">
            <div className="font-poly italic font-normal text-base text-left text-[#A2AAB6]">Additional (£1 each)</div>
            <div className="flex flex-row flex-wrap justify-items-start">
              {addOns.map((addOn) => (
                <>
                  <CheckBoxIcon checked={false} />
                  <label key={addOn} className="text-[#333F4C] gap-2 p-2">
                    {addOn}
                  </label>
                </>
              ))}
            </div>
          </div> */}
          <div className="flex flex-col w-full justify-items-start p-0 gap-2">
            <div className="font-poly italic font-normal text-base text-left text-[#A2AAB6]">Contains Allergens</div>
            <div className="flex flex-row justify-items-start">
              {allergens.map((allergen) => (
                <>
                  <label key={allergen} className="text-[#333F4C] gap-2 p-2">
                    {allergen}
                  </label>
                </>
              ))}
            </div>
          </div>

          <div className="flex flex-row self-stretch rounded-lg items-center p-0 gap-4">
            <Button className="flex grow justify-center border-2 border-solid border-[#A2AAB6] gap-2.5py-4 px-3" size="small" colour="clear" onClick={() => disableShow(false)}>
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
                className="flex grow justify-center gap-2.5py-4 px-3"
              >
              Add to order £{(product.price * counter * 1e2) / 1e2}
              </Button>
            ) : (
              <Button
                onClick={() => {
                  removeProduct(product);                  ;
                  disableShow(false);
                }}
                size="small"
                colour="yellow"
                className="flex grow justify-center gap-2.5py-4 px-3"
              >
              Remove from order
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
