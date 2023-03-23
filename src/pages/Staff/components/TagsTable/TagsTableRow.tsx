import { ReactElement } from 'react';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TrashIcon from 'common/Icons/TrashIcon';
import { TagDto } from 'dtos/Tag/TagDto';
import TagProblemDetails from 'dtos/Tag/TagProblemDetails';
import useTags from 'hooks/useTags';
import { toast } from 'react-toastify';
import { useTagFormContext } from '../TagForm/TagFormContext';

interface Props {
  tag: TagDto;
  padding: string;
}

const displayErrors = (BackendProblems: TagProblemDetails): void => {
  if (BackendProblems.errors.name) {
    toast.error(String(BackendProblems.errors.name));
  }
  if (BackendProblems.errors.products) {
    toast.error(String(BackendProblems.errors.products));
  }
  if (BackendProblems.errors.description) {
    toast.error(String(BackendProblems.errors.description));
  }
  if (BackendProblems.errors.tag) {
    toast.error(String(BackendProblems.errors.tag));
  }
};

export default function TagsTableRow({ tag, padding }: Props): ReactElement {
  const formContext = useTagFormContext();
  const { removeTag } = useTags();

  const handleDelete = async (): Promise<void> => {
    await removeTag.mutateAsync(tag.id, {
      onSuccess: (): void => {
        toast.success(`The Tag, ${tag.name}, was successfully retired.`);
      },
      onError: displayErrors,
    });
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
