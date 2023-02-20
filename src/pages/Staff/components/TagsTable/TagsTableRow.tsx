import { ReactElement } from 'react';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TrashIcon from 'common/Icons/TrashIcon';
import { TagDto } from 'dtos/TagDto';
import { toast } from 'react-toastify';
import { useTagFormContext } from '../TagForm/TagFormContext';

interface Props {
  tag: TagDto;
  padding: string;
}

export default function TagsTableRow({ tag, padding }: Props): ReactElement {
  const formContext = useTagFormContext();

  const handleDelete = (): void => {
    toast.success(`Product "${tag.name}" was succesfully removed.`);
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
        <TrashIcon onClick={() => handleDelete} />
      </td>
    </tr>
  );
}
