import { ReactElement } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';
import { useTagFormContext } from 'components/TagForm/TagFormContext';
import { TagDto } from 'dtos/TagDto';

interface Props {
  tag: TagDto;
  padding: string;
}

export const TagsTableRow = ({ tag, padding }: Props): ReactElement => {
  //const { removetag } = useProducts();
  const formContext = useTagFormContext();

  const handleDelete = (): void => {
    console.log('Retiring of tags not yet implemented');
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
      <td className={'text-left ' + padding}>{tag.id}</td>
      <td className={'text-left ' + padding}>{tag.name}</td>
      <td className={'text-center ' + padding}>{tag.products?.length ?? '0'}</td>
      <td className={padding}>
        <FontAwesomeIcon icon={faPen} onClick={() => formContext.startEditing(tag)} role="button" className={iconClass} />
        <FontAwesomeIcon icon={faTrashCan} onClick={handleDelete} onKeyDown={handleDelete} role="button" className={iconClass} />
      </td>
    </tr>
  );
};
