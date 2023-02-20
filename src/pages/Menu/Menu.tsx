import { ReactElement, useEffect, useState } from 'react';
import LoaderOverlay from 'common/LoaderOverlay/LoaderOverlay';
import PageLayout from 'common/PageLayout/PageLayout';
import { ProductDto } from 'dtos/ProductDto';
import { motion } from 'framer-motion';
import useCategories from 'hooks/useCategories';
import useProducts from 'hooks/useProducts';
import MenuCategories from './components/MenuCategories/MenuCategories';
import MenuItems from './components/MenuItems/MenuItems';
import OrderPanel from './components/OrderPanel/OrderPanel';

export default function MenuPage(): ReactElement {
  const { products } = useProducts(true);
  const { categories } = useCategories(true);
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  useEffect(() => {
    if (categories.data) {
      setSelectedCategory(categories.data[0].id);
    }
  }, [categories.data]);

  if (!categories || !products) {
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
          <MenuCategories selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories.data ?? []} />
        </div>
      </div>
      <div className="mb-[5%] grid grid-cols-12">
        <div className="col-span-2" />
        <div className="col-span-6 text-center">
          <h6 className="font-poly mt-5 mb-6 text-lg italic text-[#E4EAEB]">
            {categories.data?.find((category) => category.id === selectedCategory)?.description}
          </h6>
          <motion.div
            role="tabpanel"
            id={selectedCategory.toString()}
            variants={tabContentVariant}
            animate={selectedCategory ? 'active' : 'inactive'}
            initial="inactive"
          >
            <MenuItems
              products={products.data?.filter((product: ProductDto) => product.category && product.category.id === selectedCategory) ?? []}
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
