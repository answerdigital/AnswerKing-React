import './ItemsTable.scss';
import { ItemsTableRow } from 'components/ItemsTableRow/ItemsTableRow';
import { useItems } from 'hooks/useItems';
import React, { ReactElement } from 'react';

export const ItemsTable = (): ReactElement => {
  const { items } = useItems();

  return (
    <table className="items_table">
      <thead>
        <tr>
          <th className="text-left">ID</th>
          <th className="text-left">Name</th>
          <th className="text-right items_table__hide_mobile">Price</th>
          <th className="text-left items_table__hide_mobile">Description</th>
          <th className="text-left items_table__hide_mobile">Categories</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {items.data?.map((item) => (
          <ItemsTableRow item={item} key={item.id} />
        ))}
      </tbody>
    </table>
  );
};
