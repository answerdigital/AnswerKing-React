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
      <div className="grid grid-cols-12">
        <div className="col-span-1"></div>
        <div className="col-span-8 text-center">
          <div className="mb-5">
            <MenuCategories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories.data} />
          </div>
          <div className="font-poly mb-6 text-lg italic text-[#E4EAEB]">Served on a brioche bun with house fries and fresh salad</div>
          <MenuItems
            products={products.data.filter(
              (product) => product.retired === false && product.categories?.find((categoryId) => categoryId === selectedCategory)
            )}
          />
        </div>
        <div className="col-span-3 mt-[145px]">
          <OrderPanel />
        </div>
      </div>
    </>
  );
};
