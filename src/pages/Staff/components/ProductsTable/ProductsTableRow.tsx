import { ReactElement } from 'react';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TrashIcon from 'common/Icons/TrashIcon';
import { ProductDto } from 'dtos/Product/ProductDto';
import ProductProblemDetails from 'dtos/Product/ProductProblemDetails';
import useProducts from 'hooks/useProducts';
import { toast } from 'react-toastify';
import GBPFormat from 'utilities/GBPFormat';
import { useProductFormContext } from '../ProductForm/ProductFormContext';

interface Props {
  product: ProductDto;
  formatting?: string;
}

const displayErrors = (BackendProblems: ProductProblemDetails): void => {
  if (BackendProblems.errors.name) {
    toast.error(String(BackendProblems.errors.name));
  }
  if (BackendProblems.errors.description) {
    toast.error(String(BackendProblems.errors.description));
  }
  if (BackendProblems.errors.price) {
    toast.error(String(BackendProblems.errors.price));
  }
  if (BackendProblems.errors.stock) {
    toast.error(String(BackendProblems.errors.stock));
  }
  if (BackendProblems.errors.categoryId) {
    toast.error(String(BackendProblems.errors.categoryId));
  }
  if (BackendProblems.errors.tagsIds) {
    toast.error(String(BackendProblems.errors.tagsIds));
  }
  if (BackendProblems.errors.product) {
    toast.error(String(BackendProblems.errors.product));
  }
};

export default function ProductsTableRow({ product, formatting = '' }: Props): ReactElement {
  const { removeProduct } = useProducts();
  const productForm = useProductFormContext();

  const handleDelete = async (): Promise<void> => {
    await removeProduct.mutateAsync(product.id, {
      onSuccess: (): void => {
        toast.success(`The Product, ${product.name}, was successfully retired.`);
      },
      onError: displayErrors,
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
