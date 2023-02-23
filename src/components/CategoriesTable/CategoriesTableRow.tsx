import { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useCategoryFormContext } from 'components/CategoryForm/CategoryFormContext';
import { CategoryDto } from 'dtos/CategoryDto';
import { toast } from 'react-toastify';
import { TrashIcon } from 'components/Icons/TrashIcon';
import { useCategories } from 'hooks/useCategories';

interface Props {
  category: CategoryDto;
  formatting: string;
}

export const CategoriesTableRow = ({ category, formatting }: Props): ReactElement => {
  const { removeCategory } = useCategories();
  const formContext = useCategoryFormContext();

  const handleDelete = async (): Promise<void> => {
    try {
      await removeCategory.mutateAsync(category.id);
      toast.success(`The Category, ${category.name}, was successfully retired.`);
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <tr>
      <td className={formatting}>{category.id}</td>
      <td className={formatting}>{category.name}</td>
      <td className={'text-center ' + formatting}>{category.products?.length ?? '0'}</td>
      <td className={'flex justify-end ' + formatting}>
        <span
          className="bg-ak-grey-5 group mr-4 flex h-[33px] w-[33px] cursor-pointer items-center justify-center rounded"
          onClick={() => formContext.startEditing(category)}
        >
          <FontAwesomeIcon icon={faPencilAlt} />
        </span>
        <TrashIcon onClick={handleDelete} />
      </td>
    </tr>
  );
};
