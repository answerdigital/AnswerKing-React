import './ProductsTable.scss';
import { ProductsTableRow } from 'components/ProductsTableRow/ProductsTableRow';
import { useProducts } from 'hooks/useProducts';
import { ReactElement } from 'react';

export const ProductsTable = (): ReactElement => {
  const { products } = useProducts();

  return (
    <table className="products_table">
      <thead>
        <tr>
          <th className="text-left">ID</th>
          <th className="text-left">Name</th>
          <th className="products_table__hide_mobile text-right">Price</th>
          <th className="products_table__hide_mobile text-left">Description</th>
          <th className="products_table__hide_mobile text-left">Categories</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {products.data?.map((product) => (
          <ProductsTableRow product={product} key={product.id} />
        ))}
      </tbody>
    </table>
  );
};
