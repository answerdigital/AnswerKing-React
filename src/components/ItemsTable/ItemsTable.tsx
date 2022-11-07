import './ItemsTable.scss';
import { ItemsTableRow } from 'components/ItemsTableRow/ItemsTableRow';
import { useItems } from 'hooks/useItems';
import React, { ReactElement, useState } from 'react';
import { ProductDto } from 'dtos/ProductDto';

export const ItemsTable = (): ReactElement => {
  const { data } = useItems().items;

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
        {console.log(data)}
        {data?.map((item) => (
          <ItemsTableRow item={item} key={item.id} />
        ))}
      </tbody>
    </table>
  );
};
