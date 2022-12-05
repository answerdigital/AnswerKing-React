import './Menu.scss';
import { LoaderOverlay } from 'components/LoaderOverlay/LoaderOverlay';
import { MenuCategories } from 'components/MenuCategories/MenuCategories';
import { MenuItems } from 'components/MenuItems/MenuItems';
import { useCategories } from 'hooks/useCategories';
import { useProducts } from 'hooks/useProducts';
import { ReactElement, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { OrderPanel } from 'components/OrderPanel/OrderPanel';

export const MenuPage = (): ReactElement => {
  const { products } = useProducts();
  const { categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<number>(1);

  if (!categories.data || !products.data) {
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
      <MenuCategories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories.data} />
      <div className="grid grid-cols-12 mt-10">
        <div className="col-span-1"></div>
        <div className="col-span-8 text-center">
          <MenuItems
            products={products.data.filter(
              (product) => product.retired === false && product.categories?.find((categoryId) => categoryId === selectedCategory)
            )}
          />
        </div>
        <div className="col-span-3">
          <OrderPanel />
        </div>
      </div>
    </>
  );
};
