import { ProductDto } from 'dtos/ProductDto';
import { useProducts } from 'hooks/useProducts';
import { ReactElement } from 'react';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';

interface Props {
  product: ProductDto;
  padding: string;
}

export const ProductsTableRow = ({ product, padding }: Props): ReactElement => {
  const { removeProduct } = useProducts();

  const handleDelete = (): void => {
    removeProduct.mutate(product.id, {
      onSuccess: () => {
        toast.success(`Product "${product.name}" was succesfully removed.`);
      },
    });
  };

  const iconClass = '';

  return (
    <tr>
      <td className={'text-left ' + padding}>{product.id}</td>
      <td className={'text-left ' + padding}>{product.name}</td>
      <td className={'text-center ' + padding}>{product.categories}</td>
      <td className={'text-center ' + padding}>None</td>
      <td className={'text-center ' + padding}>£{product.price.toFixed(2)}</td>
      <td className={'text-center ' + padding}>None</td>
      {/*<td className="text-left products_table__hide_mobile">*/}
      {/*  {product.categories?.map((category) => category.name).join(', ')}*/}
      {/*</td>*/}
      <td className={'flex justify-evenly ' + padding}>
        <FontAwesomeIcon icon={faPen} role="button" className={iconClass} />
        <FontAwesomeIcon icon={faTrashCan} onClick={handleDelete} onKeyDown={handleDelete} role="button" className={iconClass} />
      </td>
    </tr>
  );
};
