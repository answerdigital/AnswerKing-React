import { ProductCard } from 'components/ProductCard/ProductCard';
import { ProductDto } from 'dtos/ProductDto';
import { motion } from 'framer-motion';
import { ReactElement } from 'react';

interface Props {
  products: ProductDto[];
}

export const MenuItems = ({ products }: Props): ReactElement => {
  if (products.length === 0) {
    return <div />;
  }

  const cardVariant = {
    active: {
      opacity: 1,
      transition: { duration: 1 },
    },
    inactive: {
      opacity: 0.3,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="mb-[48px] grid max-h-[60vh] grid-cols-3">
      {products.map((product) => (
        <motion.div key={product.id} variants={cardVariant}>
          <ProductCard product={product} key={product.id} />
        </motion.div>
      ))}
    </div>
  );
};
