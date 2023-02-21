import { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { useTagFormContext } from 'components/TagForm/TagFormContext';
import { TagDto } from 'dtos/TagDto';
import { TrashIcon } from 'components/Icons/TrashIcon';
import { toast } from 'react-toastify';
import { useTags } from 'hooks/useTags';

interface Props {
  tag: TagDto;
  padding: string;
}

export const TagsTableRow = ({ tag, padding }: Props): ReactElement => {
  const { removeTag } = useTags();
  const formContext = useTagFormContext();

  const handleDelete = (): void => {
    removeTag.mutate(tag.id, {
      onSuccess: () => {
        toast.success(`Product "${tag.name}" was succesfully removed.`);
      },
    });
  };

  return (
    <tr>
      <td className={padding}>{tag.id}</td>
      <td className={padding}>{tag.name}</td>
      <td className={'text-center ' + padding}>{tag.products?.length ?? '0'}</td>
      <td className={'flex justify-end ' + padding}>
        <span
          className="bg-ak-grey-5 group mr-4 flex h-[33px] w-[33px] cursor-pointer items-center justify-center rounded"
          onClick={() => formContext.startEditing(tag)}
        >
          <FontAwesomeIcon icon={faPencilAlt} />
        </span>
        <TrashIcon onClick={handleDelete} />
      </td>
    </tr>
  );
};
