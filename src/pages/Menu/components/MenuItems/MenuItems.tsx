import { ProductDto } from 'dtos/ProductDto';
import { ReactElement } from 'react';
import { ProductCard } from '../ProductCard/ProductCard';

interface Props {
  products: ProductDto[];
}

export const MenuItems = ({ products }: Props): ReactElement => {
  if (products.length === 0) {
    return <div />;
  }

  return (
    <div data-testid="products" className="mb-[48px] grid max-h-[60vh] grid-cols-3">
      {products.map((product) => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};
