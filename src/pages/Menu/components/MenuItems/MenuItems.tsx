import { ReactElement } from 'react';
import { ProductDto } from 'dtos/ProductDto';
import ProductCard from '../ProductCard/ProductCard';

interface Props {
  products: ProductDto[];
}

export default function MenuItems({ products }: Props): ReactElement {
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
}
