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
    <div className="mx-auto mb-7 h-auto w-10/12 max-w-sm rounded-lg border-gray-200 bg-white shadow-md">
      <img alt="burger" className="h-[200px] w-full rounded-t-lg" src={PlaceHolderImage} />
      <div className="p-4">
        <h5 className="mb-1 text-center text-xl font-bold tracking-tight text-gray-700">{product.name}</h5>
        <p className="font-poly mb-3 text-center text-base font-semibold italic text-gray-700">
          {product.description.length > 80 ? product.description.substring(0, 80) + '...' : product.description}
        </p>
        <div className="mb-5 flex px-3">
          <p className="font-poppins mt-0.5 flex flex-1 items-center justify-center text-sm text-black">£{(product.price * 1e2) / 1e2}</p>
          <Button onClick={() => addToLocalOrder(product)} size="large" colour="yellow" className="text-sm font-semibold">
            Add to order
          </Button>
        </div>
      </div>
    </div>
  );
};
