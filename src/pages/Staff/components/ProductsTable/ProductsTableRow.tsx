import { ReactElement } from 'react';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TrashIcon from 'common/Icons/TrashIcon';
import ProductDto from 'dtos/Product/ProductDto';
import useProducts from 'hooks/useProducts';
import { toast } from 'react-toastify';
import GBPFormat from 'utilities/GBPFormat';
import { useProductFormContext } from '../ProductForm/ProductFormContext';

interface Props {
  product: ProductDto;
  formatting?: string;
}

export default function ProductsTableRow({ product, formatting = '' }: Props): ReactElement {
  const { removeProduct } = useProducts();
  const productForm = useProductFormContext();

  const handleDelete = async (): Promise<void> => {
    try {
      await removeProduct.mutateAsync(product.id);
      toast.success(`The Product, ${product.name}, was successfully retired.`);
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <tr data-testid="products-data-row">
      <td className={formatting} data-testid="product-id">
        {product.id}
      </td>
      <td className={formatting} data-testid="product-name">
        {product.name}
      </td>
      <td className={`text-center ${formatting}`}>{product.category?.name}</td>
      <td className={`text-center ${formatting}`}>None</td>
      <td className={`text-center ${formatting}`} data-testid="product-price">
        {GBPFormat.format(product.price)}
      </td>
      <td className={`text-center ${formatting}`}>None</td>
      <td className={`flex justify-end ${formatting}`}>
        <span
          role="button"
          tabIndex={0}
          onClick={() => productForm.startEditing(product)}
          onKeyDown={() => productForm.startEditing(product)}
          className="bg-ak-grey-5 group mr-4 flex h-[33px] w-[33px] cursor-pointer items-center justify-center rounded"
        >
          <FontAwesomeIcon icon={faPencilAlt} />
        </span>
        <TrashIcon onClick={handleDelete} />
      </td>
    </tr>
  );
}
