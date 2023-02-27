import { ReactElement } from 'react';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TrashIcon from 'common/Icons/TrashIcon';
import { TagDto } from 'dtos/Tag/TagDto';
import useTags from 'hooks/useTags';
import { toast } from 'react-toastify';
import { useTagFormContext } from '../TagForm/TagFormContext';

interface Props {
  tag: TagDto;
  padding: string;
}

export default function TagsTableRow({ tag, padding }: Props): ReactElement {
  const formContext = useTagFormContext();
  const { removeTag } = useTags();

  const handleDelete = async (): Promise<void> => {
    try {
      await removeTag.mutateAsync(tag.id);
      toast.success(`The Tag, ${tag.name}, was successfully retired.`);
    } catch (error) {
      toast.error(error as string);
    }
  };

  return (
    <tr>
      <td className={padding}>{tag.id}</td>
      <td className={padding}>{tag.name}</td>
      <td className={`text-center ${padding}`}>{tag.products?.length ?? '0'}</td>
      <td className={`flex justify-end ${padding}`}>
        <span
          className="bg-ak-grey-5 group mr-4 flex h-[33px] w-[33px] cursor-pointer items-center justify-center rounded"
          onClick={() => formContext.startEditing(tag)}
          onKeyDown={() => formContext.startEditing(tag)}
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
