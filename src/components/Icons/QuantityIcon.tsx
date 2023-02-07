import { ReactElement } from 'react';
import cn from 'classnames';

interface Props {
  quantity: number;
}

export const QuantityIcon = ({ quantity }: Props): ReactElement => {
  const iconClass =
    'w-[33px] h-[33px] text-center text-[18px] font-[400] flex items-center justify-center rounded mr-[24px] border rounded bg-[#E4EAEB]';
  return (
    <>
      <span data-testid="quantity" className={cn(iconClass)}>
        {quantity}
      </span>
    </>
  );
};
