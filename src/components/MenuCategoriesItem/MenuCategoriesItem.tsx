import './MenuCategoriesItem.scss';
import cn from 'classnames';
import { CategoryDto } from 'dtos/CategoryDto';
import { useOnScreen } from 'hooks/useOnScreen';
import { ReactElement } from 'react';

interface Props {
  category: CategoryDto;
}

export const MenuCategoriesItem = ({ category }: Props): ReactElement => {
  const name: string = category.name !== undefined ? category.name : '';
  const isOnScreen = useOnScreen(name);

  return (
    <a
      className={cn('menu_categories__item', { 'menu_categories__item--active': isOnScreen })}
      href={'#' + category.name}
    >
      {category.name}s
    </a>
  );
};
