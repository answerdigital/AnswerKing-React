import './MenuItems.scss';
import { ItemCard } from 'components/ItemCard/ItemCard';
import { CategoryDto } from 'dtos/CategoryDto';
import { ItemDto } from 'dtos/ItemDto';
import React, { ReactElement } from 'react';

interface Props {
  category: CategoryDto;
  items: ItemDto[];
}

export const MenuItems = ({ category, items }: Props): ReactElement => {
  if (items.length === 0) {
    return <div />;
  }
  return (
    <div className="mw-960" id={category.name}>
      <div className="menu_items__category">{category.name}s</div>
      <div className="menu_items">
        {items.map((item) => (
          <ItemCard item={item} key={item.id} />
        ))}
        <div className="menu_items__filler" />
        <div className="menu_items__filler" />
        <div className="menu_items__filler" />
        <div className="menu_items__filler" />
        <div className="menu_items__filler" />
        <div className="menu_items__filler" />
      </div>
    </div>
  );
};
