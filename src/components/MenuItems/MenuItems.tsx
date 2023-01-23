import { ProductCard } from 'components/ProductCard/ProductCard';
import { ProductDto } from 'dtos/ProductDto';
import { ReactElement } from 'react';

interface Props {
  products: ProductDto[];
}

export const MenuItems = ({ products }: Props): ReactElement => {
  if (products.length === 0) {
    return <div />;
  }
  return (
    <div>
      <div className="mb-[48px] mr-[40px] grid max-h-[60vh] grid-cols-3 px-16">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};
