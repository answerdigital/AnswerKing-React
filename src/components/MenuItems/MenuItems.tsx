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
      <div className="grid grid-cols-3 px-16 mb-12">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </div>
  );
};
