import { ProductDto } from 'dtos/ProductDto';
import { useProducts } from 'hooks/useProducts';
import { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useProductFormContext } from 'components/ProductForm/ProductFormContext';
import { toast } from 'react-toastify';
import { TrashIcon } from 'components/Icons/TrashIcon';
import { GBPFormat } from 'utilities/GBPFormat';

interface Props {
  product: ProductDto;
  formatting?: string;
}

export const ProductsTableRow = ({ product, formatting = '' }: Props): ReactElement => {
  const { removeProduct } = useProducts();
  const productForm = useProductFormContext();

  const handleDelete = (): void => {
    removeProduct.mutate(product.id, {
      onSuccess: () => {
        toast.success(`Product "${product.name}" was succesfully removed.`);
      },
    });
  };

  return (
    <tr data-testid="products-data-row">
      <td className={formatting} data-testid="product-id">
        {product.id}
      </td>
      <td className={formatting} data-testid="product-name">
        {product.name}
      </td>
      <td className={'text-center ' + formatting}>{product.category?.name}</td>
      <td className={'text-center ' + formatting}>None</td>
      <td className={'text-center ' + formatting} data-testid="product-price">
        {GBPFormat.format(product.price)}
      </td>
      <td className={'text-center ' + formatting}>None</td>
      <td className={'flex justify-end ' + formatting}>
        <span
          onClick={() => productForm.startEditing(product)}
          role="button"
          className="bg-ak-grey-5 group mr-4 flex h-[33px] w-[33px] cursor-pointer items-center justify-center rounded"
        >
          <FontAwesomeIcon icon={faPencilAlt} />
        </span>
        <TrashIcon onClick={() => handleDelete()} />
      </td>
    </tr>
  );
};
