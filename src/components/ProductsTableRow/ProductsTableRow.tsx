import './ProductsTableRow.scss';
import { ReactElement } from 'react';
import { ProductDto } from 'dtos/ProductDto';
import { useCategories } from 'hooks/useCategories';

interface Props {
  product: ProductDto;
}

export const ProductsTableRow = ({ product }: Props): ReactElement => {
  const { categories } = useCategories();
  const categoriesByProduct = [
    ...new Set(categories.data?.filter((element) => product.categories?.includes(element.id))),
  ].map((category) => category.name);
  return (
    <>
      <tr key={product.id}>
        <td className="">{product.id}</td>
        <td className="">{product.name}</td>
        <td className="">£{product.price.toFixed(2)}</td>
        <td className="">{product.description}</td>
        <td className="">{categoriesByProduct.join(', ')}</td>
        <td className="">
          <span className="products_table_row__delete" role="button" tabIndex={0}>
            Delete
          </span>
        </td>
      </tr>
    </>
  );
};
