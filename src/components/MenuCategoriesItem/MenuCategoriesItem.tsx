import './MenuCategoriesItem.scss';
import cn from 'classnames';
import { CategoryDto } from 'dtos/CategoryDto';
import { useOnScreen } from 'hooks/useOnScreen';
import React, { ReactElement } from 'react';

interface Props {
  category: CategoryDto;
}

export const MenuCategoriesItem = ({ category }: Props): ReactElement => {
  const isOnScreen = useOnScreen(category.name);

  return (
    <a
      className={cn('menu_categories__item', {
        'menu_categories__item--active': isOnScreen,
      })}
      href={'#' + category.name}
    >
      {category.name}s
    </a>
  );
};
