import './Menu.scss';
import { LoaderOverlay } from 'components/LoaderOverlay/LoaderOverlay';
import { MenuCategories } from 'components/MenuCategories/MenuCategories';
import { MenuItems } from 'components/MenuItems/MenuItems';
import { useCategories } from 'hooks/useCategories';
import { useProducts } from 'hooks/useProducts';
import { ReactElement, useState } from 'react';
import { OrderPanel } from 'components/OrderPanel/OrderPanel';
import { PageLayout } from 'components/PageLayout/PageLayout';

export const MenuPage = (): ReactElement => {
  const { products } = useProducts();
  const { categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<number>(1);

  if (!categories.data || !products.data) {
    return (
      <PageLayout title={'Menu - Answer King'}>
        <div className="menu">
          <LoaderOverlay isEnabled />
        </div>
      </PageLayout>
    );
  }
  return (
    <PageLayout title={'Menu - Answer King'}>
      <MenuCategories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories.data} />
      <div className="mt-10 grid grid-cols-12">
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
    </PageLayout>
  );
};
