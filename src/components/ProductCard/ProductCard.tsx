import PlaceHolderImage from 'assets/burger_transparent.png';
import { Badge } from 'components/Badge/Badge';
import { Button } from 'components/Button/Button';
import { ProductDto } from 'dtos/ProductDto';
import { MouseEventHandler, ReactElement, useCallback } from 'react';
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
    <div className="relative mx-auto mb-7 h-[365px] w-[247px] rounded-lg border-gray-200 bg-white shadow-md">
      <img alt="burger" className="h-[200px] w-full rounded-t-lg" src={PlaceHolderImage} />
      {product.name === 'Nurturation Burger' && <Badge background={'bg-[#333F4C]'}>New</Badge>}
      <div className="p-4">
        <h5 className="mb-1 text-center text-xl font-bold tracking-tight text-[#333F4C]">{product.name}</h5>
        <p className="font-poly mb-3 text-center text-base font-[400] italic text-[#333F4C]">
          {product.description.length > 50 ? product.description.substring(0, 50) + '...' : product.description}
        </p>
      </div>
      <div className="absolute bottom-[20px] mx-auto flex px-[30px]">
        <p className="mt-0.5 flex items-center justify-center pr-[17px] text-[14px] text-[#333F4C]">£{(product.price * 1e2) / 1e2}</p>
        <Button onClick={addToOrder} size="small" colour="yellow" className="py-[5px] text-[14px] font-[400]">
          Add to order
        </Button>
      </div>
    </div>
  );
};
