import { ReactElement, useEffect, useMemo, useState } from 'react';
import LoaderOverlay from 'common/LoaderOverlay/LoaderOverlay';
import PageLayout from 'common/PageLayout/PageLayout';
import ProductDto from 'dtos/Product/ProductDto';
import { motion } from 'framer-motion';
import useCategories from 'hooks/useCategories';
import useProducts from 'hooks/useProducts';
import MenuCategories from './components/MenuCategories/MenuCategories';
import MenuItems from './components/MenuItems/MenuItems';
import OrderPanel from './components/OrderPanel/OrderPanel';

export default function MenuPage(): ReactElement {
  const { products } = useProducts();
  const { categories } = useCategories();
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const filteredCategories = useMemo(
    () => categories.data?.filter((category) => !category?.retired === false || category.products?.length !== 0) ?? [],
    [categories.data]
  );

  useEffect(() => {
    if (filteredCategories.length > 0) {
      setSelectedCategory(filteredCategories[0].id);
    }
  }, [filteredCategories]);

  if (!categories.data || !products.data) {
    return (
      <PageLayout title="Menu - Answer King">
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
    <PageLayout title="Menu - Answer King">
      <div className="grid grid-cols-12">
        <div className="col-span-2" />
        <div className="col-span-6 text-center">
          <MenuCategories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={filteredCategories} />
        </div>
      </div>
      <div className="mb-[5%] grid grid-cols-12">
        <div className="col-span-2" />
        <div className="col-span-6 text-center">
          <h6 className="font-poly text-ak-grey-5 mt-5 mb-6 text-lg italic">
            {filteredCategories.find((category) => category.id === selectedCategory)?.description}
          </h6>
          <motion.div
            role="tabpanel"
            id={selectedCategory.toString()}
            variants={tabContentVariant}
            animate={selectedCategory ? 'active' : 'inactive'}
            initial="inactive"
          >
            <MenuItems
              products={products.data.filter(
                (product: ProductDto) => product.retired === false && product.category && product.category.id === selectedCategory
              )}
            />
          </motion.div>
        </div>
        <div className="col-span-2 ml-[7%]">
          <OrderPanel />
        </div>
      </div>
    </PageLayout>
  );
}
