import { ProductDto } from 'dtos/ProductDto';
import { ReactElement, useState } from 'react';
import cn from 'classnames';
import { DeleteProductModal } from 'components/Modals/DeleteProductModal';

interface Props {
  product: ProductDto;
}

export const TrashIcon = ({ product }: Props): ReactElement => {
  const [isOpen, setIsOpen] = useState(false);
  const iconClass = 'w-[35px] h-[35px] flex items-center justify-center rounded mr-[24px] border rounded bg-[#E4EAEB]';
  return (
    <>
      {isOpen && <DeleteProductModal product={product} setIsOpen={setIsOpen} />}
      <div className={cn(iconClass)} onClick={() => setIsOpen(true)}>
        <div className="group cursor-pointer justify-center text-center">
          <svg
            className={cn(!isOpen ? 'duration-300 group-hover:-translate-y-[1px] group-hover:rotate-[7deg]' : '')}
            width="15"
            height="5"
            viewBox="0 0 12 3"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path className="group-hover:fill-red-600" d="M8.75 1H11.5V3H0.5V1H3.25L4.03571 0H7.96428L8.75 1Z" fill="#333F4C" />
          </svg>
          <svg className="ml-[1.5px]" width="12px" height="14px" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              className="group-hover:fill-red-600"
              d="M0.5 8.57143C0.5 8.95031 0.658035 9.31367 0.93934
    9.58158C1.22064 9.84949 1.60218 10 2 10H8C8.39783 10 8.77936 9.84949 9.06066 9.58158C9.34196 9.31367 9.5 8.95031 9.5 8.57143V0H0.5V8.57143Z"
              fill="#333F4C"
            />
          </svg>
        </div>
      </div>
    </>
  );
};
