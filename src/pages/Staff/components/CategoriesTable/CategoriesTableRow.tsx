import { ReactElement } from 'react';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TrashIcon from 'common/Icons/TrashIcon';
import { CategoryDto } from 'dtos/CategoryDto';
import { toast } from 'react-toastify';
import useCategories from 'hooks/useCategories';
import { useCategoryFormContext } from '../CategoryForm/CategoryFormContext';

interface Props {
  category: CategoryDto;
  formatting: string;
}

export default function CategoriesTableRow({ category, formatting }: Props): ReactElement {
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
      <td className={`text-center ${formatting}`}>{category.products?.length ?? '0'}</td>
      <td className={`flex justify-end ${formatting}`}>
        <span
          className="bg-ak-grey-5 group mr-4 flex h-[33px] w-[33px] cursor-pointer items-center justify-center rounded"
          onClick={() => formContext.startEditing(category)}
          onKeyDown={() => formContext.startEditing(category)}
          role="button"
          tabIndex={0}
        >
          <FontAwesomeIcon icon={faPencilAlt} />
        </span>
        <TrashIcon onClick={handleDelete} />
      </td>
    </tr>
  );
}
