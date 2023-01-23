import PlaceHolderImage from 'assets/burger_transparent.png';
import { Badge } from 'components/Badge/Badge';
import { Button } from 'components/Button/Button';
import { ProductDto } from 'dtos/ProductDto';
import { ReactElement } from 'react';
import { useLocalOrder } from '../../context/OrderContext';

interface Props {
  product: ProductDto;
}

export const ProductCard = ({ product }: Props): ReactElement => {
  const { addToLocalOrder } = useLocalOrder();

  function addToOrder (): void {
    addToLocalOrder(product);
  }

  return (
    <div className="mx-auto mb-7 h-[365px] w-[247px] rounded-lg border-gray-200 bg-white shadow-md relative">
      <img alt="burger" className="h-[200px] w-full rounded-t-lg" src={PlaceHolderImage} />
      {product.name === 'Nurturation Burger' && <Badge background={'bg-[#333F4C]'}>New</Badge>}
      <div className="p-4">
        <h5 className="mb-1 text-center text-xl font-bold tracking-tight text-[#333F4C]">{product.name}</h5>
        <p className="font-poly mb-3 text-center text-base font-[400] italic text-[#333F4C]">
          {product.description.length > 50 ? product.description.substring(0, 50) + '...' : product.description}
        </p>
      </div>
      <div className="flex absolute mx-auto px-[30px] bottom-[20px]">
        <p className="mt-0.5 flex items-center justify-center text-[14px] text-[#333F4C] pr-[25px]">£{(product.price * 1e2) / 1e2}</p>
        <Button onClick={addToOrder} size="medium" colour="yellow" className="text-sm font-[400] py-[5px]">
            Add to order
        </Button>
      </div>
    </div>
  );
};
