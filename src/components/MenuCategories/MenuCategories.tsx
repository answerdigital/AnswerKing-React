import './MenuCategories.scss';
import { MenuCategoriesItem } from 'components/MenuCategoriesItem/MenuCategoriesItem';
import { CategoryDto } from 'dtos/CategoryDto';
import React, { ReactElement } from 'react';

interface Props {
  categories: CategoryDto[];
}

export const MenuCategories = ({ categories }: Props): ReactElement => {
  return (
    <div className="menu_categories mw-960">
      {categories.map((category) => (
        <MenuCategoriesItem category={category} key={category.id} />
      ))}
    </div>
  );
};
