import './Menu.scss';
import { LoaderOverlay } from 'components/LoaderOverlay/LoaderOverlay';
import { MenuCategories } from 'components/MenuCategories/MenuCategories';
import { MenuItems } from 'components/MenuItems/MenuItems';
import { useCategories } from 'hooks/useCategories';
import { useProducts } from 'hooks/useProducts';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { OrderPanel } from 'components/OrderPanel/OrderPanel';
import { PageLayout } from 'components/PageLayout/PageLayout';
import { motion } from 'framer-motion';

export const MenuPage = (): ReactElement => {
  const { products } = useProducts();
  const { categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const filteredCategories = useMemo(() => {
    return categories.data?.filter((category) => !category.retired) ?? [];
  }, [categories.data]);

  useEffect(() => {
    if (filteredCategories.length > 0) {
      setSelectedCategory(filteredCategories[0].id);
    }
  }, [filteredCategories]);

  if (!categories.data || !products.data) {
    return (
      <PageLayout title={'Menu - Answer King'}>
        <div className="menu">
          <LoaderOverlay isEnabled />
        </div>
      </PageLayout>
    );
  }

  const tabContentVariant = {
    active: {
      display: 'block',
      transition: { staggerChildren: 0.2 },
    },
    inactive: { display: 'none' },
  };

  return (
    <PageLayout title={'Menu - Answer King'}>
      <div className="grid grid-cols-12">
        <div className="col-span-2"></div>
        <div className="col-span-6 text-center">
          <MenuCategories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={filteredCategories} />
        </div>
      </div>
      <div className="mb-[5%] grid grid-cols-12">
        <div className="col-span-2"></div>
        <div className="col-span-6 text-center">
          <h6 className="font-poly mt-5 mb-6 text-lg italic text-[#E4EAEB]">
            {filteredCategories.find((category) => category.id == selectedCategory)?.description}
          </h6>
          <motion.div
            role="tabpanel"
            id={selectedCategory.toString()}
            variants={tabContentVariant}
            animate={selectedCategory ? 'active' : 'inactive'}
            initial="inactive"
          >
            <MenuItems
              products={products.data.filter((product) => product.retired === false && product.category && product.category.id === selectedCategory)}
            />
          </motion.div>
        </div>
        <div className="col-span-2 ml-[7%]">
          <OrderPanel />
        </div>
      </div>
    </PageLayout>
  );
};
