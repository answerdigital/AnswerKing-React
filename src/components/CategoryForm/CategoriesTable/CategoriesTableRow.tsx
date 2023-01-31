import { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import { useCategoryFormContext } from 'components/CategoryForm/CategoryFormContext';
import { CategoryDto } from 'dtos/CategoryDto';

interface Props {
  category: CategoryDto;
  padding: string;
}

export const CategoriesTableRow = ({ category, padding }: Props): ReactElement => {
  //const { removecategory } = useProducts();
  const formContext = useCategoryFormContext();

  const handleDelete = (): void => {
    console.log('Retiring of categories not yet implemented');
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
      <td className={'text-left ' + padding}>{category.id}</td>
      <td className={'text-left ' + padding}>{category.name}</td>
      <td className={'text-center ' + padding}>{category.products?.length ?? '0'}</td>
      <td className={padding}>
        <FontAwesomeIcon icon={faPen} onClick={() => formContext.startEditing(category)} role="button" className={iconClass} />
        <FontAwesomeIcon icon={faTrashCan} onClick={handleDelete} onKeyDown={handleDelete} role="button" className={iconClass} />
      </td>
    </tr>
  );
};
