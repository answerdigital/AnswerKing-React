import { ReactElement } from 'react';
import { ProductDto } from 'dtos/ProductDto';
import { MenuProductModal } from './MenuProductModal';

interface Props {
  product: ProductDto;
  showModal: boolean;
  disableShow: (isShow: boolean) => void;
}

export const Modal = ({ product, showModal, disableShow }: Props): ReactElement => {
  return (
    <>
      {showModal ? (
        <>
          <MenuProductModal product={product} disableShow={disableShow} />
        </>
      ) : null}
    </>
  );
};
