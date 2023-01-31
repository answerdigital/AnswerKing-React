import PlaceHolderImage from 'assets/burger_transparent.png';
import { BadgeIcon } from 'components/Icons/BadgeIcon';
import { Button } from 'components/Button/Button';
import { ProductDto } from 'dtos/ProductDto';
import { ReactElement, useCallback } from 'react';
import { useLocalOrder } from '../../context/OrderContext';

interface Props {
  product: ProductDto;
}

export const ProductCard = ({ product }: Props): ReactElement => {
  const { addToLocalOrder } = useLocalOrder();

  const addToOrder = useCallback(() => {
    addToLocalOrder(product);
  }, [addToLocalOrder, product]);

  return (
    <div className="relative mx-auto mb-7 h-[40vh] w-[28vh] rounded-lg border-gray-200 bg-white shadow-md">
      <img alt="burger" className="h-[50%] w-full rounded-t-lg object-cover" src={PlaceHolderImage} />
      {product && <BadgeIcon>New</BadgeIcon>}
      <div className="p-5">
        <h5 className="mb-2 text-center text-xl font-bold tracking-tight text-[#333F4C]">{product.name}</h5>
        <div className="flex justify-center text-center">
          <p className="font-poly self-center text-base font-[400] italic text-[#333F4C]">
            {product.description.length > 50 ? product.description.substring(0, 50) + '...' : product.description}
          </p>
        </div>
      </div>
      <div className="absolute bottom-5 flex w-full justify-between px-7 text-center">
        <p className="flex items-center justify-center text-[14px] text-[#333F4C]">£{(product.price * 1e2) / 1e2}</p>
        <Button onClick={addToOrder} size="small" colour="yellow" className="py-1 text-[14px] font-[400] leading-[21px]">
          Add to order
        </Button>
      </div>
    </div>
  );
};
