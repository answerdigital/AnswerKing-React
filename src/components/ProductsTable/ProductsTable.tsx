import './ProductsTable.scss';
import { ProductsTableRow } from 'components/ProductsTableRow/ProductsTableRow';
import { ReactElement } from 'react';
import { useProducts } from 'hooks/useProducts';

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
          <ProductsTableRow key={product.id} product={product} />
        ))}
      </tbody>
    </table>
  );
};
