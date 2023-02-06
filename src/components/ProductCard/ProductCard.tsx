import PlaceHolderImage from 'assets/burger_transparent.png';
import {BadgeIcon} from 'components/Icons/BadgeIcon';
import { Button } from 'components/Buttons/Button';
import { MenuProductModal } from 'components/Modals/MenuProductModal';
import {ProductDto} from 'dtos/ProductDto';
import {ReactElement, useState} from 'react';
import {motion} from 'framer-motion';
import {RoundingPrice} from 'utilities/RoundingPriceFormat';

interface Props {
  product: ProductDto;
}

export const ProductCard = ({product}: Props): ReactElement => {
  const [showProductModal, setshowProductModal] = useState(false);

  const cardVariant = {
    active: {
      opacity: 1,
      transition: {duration: 1},
    },
    inactive: {
      opacity: 0.4,
      transition: {duration: 1},
    },
  };
  return (
    <>
      <MenuProductModal product={product} showProductModal={showProductModal} disableShow={setshowProductModal}/>
      <motion.div key={product.id} variants={cardVariant}>
        <div data-testid="product-card" onClick={() => setshowProductModal(true)}>
          <div className="relative mx-auto mb-7 h-[40vh] w-[28vh] rounded-lg border-gray-200 bg-white shadow-md">
            <img alt="burger" className="h-[50%] w-full rounded-t-lg object-cover" src={PlaceHolderImage}/>
            {product && <BadgeIcon>New</BadgeIcon>}
            <div className="p-5">
              <h5 data-testid="product-name" className="mb-2 text-center text-xl font-bold tracking-tight text-[#333F4C]">{product.name}</h5>
              <div className="flex justify-center text-center">
                <p data-testid="product-description" className="font-poly self-center text-base font-[400] italic text-[#333F4C]">
                  {product.description.length > 50 ? product.description.substring(0, 50) + '...' : product.description}
                </p>
              </div>
            </div>
            <div className="absolute bottom-5 flex w-full justify-between px-7 text-center">
              <p
                data-testid="price"
                className="flex items-center justify-center text-[14px] text-[#333F4C]">£{RoundingPrice(product.price)}</p>
              <Button data-testid="show-product-modal" onClick={() => setshowProductModal(true)} size="small"
                colour="yellow" className="py-1 text-[14px] font-[400] leading-[21px]">
                Add to order
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
};
