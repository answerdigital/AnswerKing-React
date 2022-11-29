import './ProductsTable.scss';
import { ProductsTableRow } from 'components/ProductsTableRow/ProductsTableRow';
import { ReactElement } from 'react';
import { useProducts } from 'hooks/useProducts';
import { useCategories } from 'hooks/useCategories';

export const ProductsTable = (): ReactElement => {
  const { products } = useProducts();
  console.log(products);
  return (
    <table className="products_table">
      <thead>
        <tr>
          <th className="text-left">ID</th>
          <th className="text-left">Name</th>
          <th className="text-right products_table__hide_mobile">Price</th>
          <th className="text-left products_table__hide_mobile">Description</th>
          <th className="text-left products_table__hide_mobile">Categories</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {products.data?.map((product) => (
          <ProductsTableRow key={product.id} product={product}/>
        ))}
      </tbody>
    </table>
  );
};
