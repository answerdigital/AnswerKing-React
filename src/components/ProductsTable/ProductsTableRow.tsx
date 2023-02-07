import { ProductDto } from 'dtos/ProductDto';
import { useProducts } from 'hooks/useProducts';
import { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import { useProductFormContext } from 'components/ProductForm/ProductFormContext';
import { toast } from 'react-toastify';

interface Props {
  product: ProductDto;
  formatting: string;
}

export const ProductsTableRow = ({ product, formatting }: Props): ReactElement => {
  const { removeProduct } = useProducts();
  const formContext = useProductFormContext();

  const handleDelete = (): void => {
    removeProduct.mutate(product.id, {
      onSuccess: () => {
        toast.success(`Product "${product.name}" was succesfully removed.`);
      },
    });
  };

  const iconClass = cn('bg-gray-300 border-gray-300 rounded border-4 m-1');

  return (
    <tr>
      <td className={formatting}>{product.id}</td>
      <td className={formatting}>{product.name}</td>
      <td className={'text-center ' + formatting}>{product.category.name}</td>
      <td className={'text-center ' + formatting}>None</td>
      <td className={'text-center ' + formatting}>£{product.price.toFixed(2)}</td>
      <td className={'text-center ' + formatting}>None</td>
      <td className={'flex justify-end ' + formatting}>
        <FontAwesomeIcon icon={faPen} onClick={() => formContext.startEditing(product)} role="button" className={iconClass} />
        <FontAwesomeIcon icon={faTrashCan} onClick={handleDelete} role="button" className={iconClass} />
      </td>
    </tr>
  );
};
