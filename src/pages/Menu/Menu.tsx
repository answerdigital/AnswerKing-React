import './Menu.scss';
import { LoaderOverlay } from 'components/LoaderOverlay/LoaderOverlay';
import { MenuCategories } from 'components/MenuCategories/MenuCategories';
import { MenuItems } from 'components/MenuItems/MenuItems';
import { useCategories } from 'hooks/useCategories';
import { useItems } from 'hooks/useItems';
import { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';

export const MenuPage = (): ReactElement => {
  const { items } = useItems();
  const { categories } = useCategories();

  if (!categories.data || !items.data) {
    return (
      <>
        <Helmet>
          <title>Menu - Answer King</title>
        </Helmet>
        <div className="menu">
          <LoaderOverlay isEnabled />
        </div>
      </>
    );
  }
  return (
    <>
      <Helmet>
        <title>Menu - Answer King</title>
      </Helmet>
      <div className="menu">
        <MenuCategories categories={categories.data} />

        <div className="menu__items">
          {categories.data.map((category) => (
            <MenuItems
              category={category}
              items={items.data.filter((item) =>
                item.categories?.find((itemCategory) => itemCategory.id === category.id)
              )}
              key={category.id}
            />
          ))}
        </div>
      </div>
    </>
  );
};
