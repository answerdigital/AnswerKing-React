import PlaceHolderImage from 'assets/burger_transparent.png';
import { Button } from 'components/Button/Button';
import { ProductDto } from 'dtos/ProductDto';
import { ReactElement } from 'react';
import { useLocalOrder } from '../../context/OrderContext';

interface Props {
  product: ProductDto;
}

export const ProductCard = ({ product }: Props): ReactElement => {
  const { addToLocalOrder } = useLocalOrder();
  return (
    <div className="mb-7 h-[340px] w-[245px] max-w-sm rounded-lg border-gray-200 bg-white shadow-md dark:border-gray-700 dark:bg-gray-800">
      <img alt="burger" className="h-[200px] w-full rounded-t-lg" src={PlaceHolderImage} />
      <div className="p-4">
        <h5 className="mb-1 text-center text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
        <p className="font-poly mb-3 text-center text-gray-700 dark:text-gray-400">{product.description}</p>
        <div className="flex px-3">
          <p className="font-poppins mt-0.5 flex-1 text-black">£{(product.price * 1e2) / 1e2}</p>
          <Button onClick={() => addToLocalOrder(product)} size="small" colour="yellow">
            Add to order
          </Button>
        </div>
      </div>
    </div>
  );
};
