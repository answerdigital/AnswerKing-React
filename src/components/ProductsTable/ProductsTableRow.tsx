import { ProductDto } from 'dtos/ProductDto';
import { useProducts } from 'hooks/useProducts';
import { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import { useProductFormContext } from 'components/ProductForm/ProductFormContext';
import { toast } from 'react-toastify';
import { TrashIcon } from 'components/Icons/TrashIcon';

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
        <span className="group mr-4 flex h-[33px] w-[33px] cursor-pointer items-center justify-center rounded border bg-[#E4EAEB]">
          <FontAwesomeIcon icon={faPen} onClick={() => formContext.startEditing(tag)} role="button" />
        </span>
        <TrashIcon onClick={() => handleDelete()} />
      </td>
    </tr>
  );
};
