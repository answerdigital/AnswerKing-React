import './ItemsTableRow.scss';
import { ItemDto } from 'dtos/ItemDto';
import { useItems } from 'hooks/useItems';
import React, { ReactElement } from 'react';
import { toast } from 'react-toastify';

interface Props {
  item: ItemDto;
}

export const ItemsTableRow = ({ item }: Props): ReactElement => {
  const { removeItem } = useItems();

  const handleDelete = (): void => {
    removeItem.mutate(item.id, {
      onSuccess: () => {
        toast.success(`Item "${item.name}" was succesfully removed.`);
      },
    });
  };

  return (
    <tr>
      <td className="text-left">{item.id}</td>
      <td className="text-left">{item.name}</td>
      <td className="text-right items_table__hide_mobile">£{item.price.toFixed(2)}</td>
      <td className="text-left items_table__hide_mobile">{item.description}</td>
      <td className="text-left items_table__hide_mobile">
        {item.categories.map((category) => category.name).join(', ')}
      </td>
      <td className="text-right">
        <span
          className="items_table_row__delete"
          onClick={handleDelete}
          onKeyDown={handleDelete}
          role="button"
          tabIndex={0}
        >
          Delete
        </span>
      </td>
    </tr>
  );
};
