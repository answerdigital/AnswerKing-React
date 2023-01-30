import { ProductDto } from 'dtos/ProductDto';
import { useProducts } from 'hooks/useProducts';
import { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import { useProductFormContext } from 'components/ProductCreateForm/ProductFormContext';

interface Props {
  product: ProductDto;
  padding: string;
}

export const ProductsTableRow = ({ product, padding }: Props): ReactElement => {
  const { removeProduct } = useProducts();
  const formContext = useProductFormContext();

  const handleDelete = (): void => {
    console.assert(false);
    /*
    removeProduct.mutate(product.id, {
      onSuccess: () => {
        toast.success(`Product "${product.name}" was succesfully removed.`);
      },
    });
    */
  };

  const iconClass = cn('bg-gray-300 border-gray-300 rounded border-4 m-1');

  return (
    <tr>
      <td className={'text-left ' + padding}>{product.id}</td>
      <td className={'text-left ' + padding}>{product.name}</td>
      <td className={'text-center ' + padding}>{product.categories}</td>
      <td className={'text-center ' + padding}>None</td>
      <td className={'text-center ' + padding}>£{product.price.toFixed(2)}</td>
      <td className={'text-center ' + padding}>None</td>
      <td className={padding}>
        <FontAwesomeIcon icon={faPen} onClick={() => formContext.startEditing(product)} role="button" className={iconClass} />
      </td>
      <td className={padding}>
        <FontAwesomeIcon icon={faTrashCan} onClick={handleDelete} onKeyDown={handleDelete} role="button" className={iconClass} />
      </td>
    </tr>
  );
};
