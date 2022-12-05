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
    <div className="max-w-sm bg-white border-gray-200 rounded-lg shadow-md w-[245px] h-[340px] dark:bg-gray-800 dark:border-gray-700 mb-7">
      <img alt="burger" className="rounded-t-lg h-[200px] w-full" src={PlaceHolderImage} />
      <div className="p-4">
        <h5 className="text-2xl mb-1 text-center font-bold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
        <p className="mb-3 text-center font-poly text-gray-700 dark:text-gray-400">{product.description}</p>
        <div className="flex px-3">
          <p className="text-black flex-1 mt-0.5 font-poppins">£{product.price}</p>
          <Button onClick={() => addToLocalOrder(product)} size="small">
            Add to order
          </Button>
        </div>
      </div>
    </div>
  );
};
