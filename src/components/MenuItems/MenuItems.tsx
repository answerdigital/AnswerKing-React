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
      <div className="mb-12 mr-10 grid max-h-[60vh] grid-cols-3 overflow-auto px-16">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};
