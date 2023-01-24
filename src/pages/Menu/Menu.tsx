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
      <div className="grid grid-cols-12">
        <div className="col-span-2"></div>
        <div className="col-span-6 pl-[100px] text-center">
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
        <div className="col-span-2 mt-[145px] pl-[20px]">
          <OrderPanel />
        </div>
        <div className="col-span-1"></div>
      </div>
    </PageLayout>
  );
};
