import './ProductsTableRow.scss';
import { ProductDto } from 'dtos/ProductDto';
import { useProducts } from 'hooks/useProducts';
import { ReactElement } from 'react';
import { toast } from 'react-toastify';

interface Props {
  product: ProductDto;
}

export const ProductsTableRow = ({ product }: Props): ReactElement => {
  const { removeProduct } = useProducts();

  const handleDelete = (): void => {
    removeProduct.mutate(product.id, {
      onSuccess: () => {
        toast.success(`Product "${product.name}" was succesfully removed.`);
      },
    });
  };

  return (
    <tr>
      <td data-testid="product-id" className="text-left">{product.id}</td>
      <td data-testid="product-name" className="text-left">{product.name}</td>
      <td data-testid="product-price" className="products_table__hide_mobile text-right">£{product.price.toFixed(2)}</td>
      <td data-testid="product-description" className="products_table__hide_mobile text-left">{product.description}</td>
      {/*<td className="text-left products_table__hide_mobile">*/}
      {/*  {product.categories?.map((category) => category.name).join(', ')}*/}
      {/*</td>*/}
      <td className="text-right">
        <span data-testid="delete-product" className="products_table_row__delete" onClick={handleDelete} onKeyDown={handleDelete} role="button" tabIndex={0}>
          Delete
        </span>
      </td>
    </tr>
  );
};
