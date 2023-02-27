import { ReactElement } from 'react';
import cn from 'classnames';

interface Props {
  quantity: number;
}

export default function QuantityIcon({ quantity }: Props): ReactElement {
  const iconClass = 'w-[33px] h-[33px] text-center text-base font-normal flex items-center justify-center rounded mr-[24px] rounded bg-ak-grey-5';
  return (
    <span data-testid="quantity" className={cn(iconClass)}>
      {quantity}
    </span>
  );
}
