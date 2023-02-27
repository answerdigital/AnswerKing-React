import { ReactElement } from 'react';
import cn from 'classnames';
import { LineItemDto } from 'dtos/LineItemDto';
import Service_Charge from 'utilities/Constants/Service_Charge';
import GBPFormat from 'utilities/GBPFormat';

interface Props {
  lineItems: LineItemDto[];
  orderComplete?: boolean;
}

export default function OrderFeesAndTotals({ lineItems, orderComplete }: Props): ReactElement {
  return (
    <div data-testid="order-fees-totals" className="mb-3 w-full">
      <hr className="mb-6 px-1" />

      {lineItems.length > 0 && !orderComplete && (
        <div className="text-ak-grey-2 flex w-full justify-between text-[11px] transition-all duration-300">
          <span>Service Charge:</span>
          <span data-testid="service-charge">{GBPFormat.format(Service_Charge)}</span>
        </div>
      )}

      <div className={cn('text-ak-grey-1 mt-2 mb-4 flex w-full justify-between text-xl font-semibold')}>
        <span>{orderComplete ? 'Paid' : 'Total'}:</span>
        <span data-testid="total">
          {GBPFormat.format(lineItems.length > 0 ? lineItems.reduce((partialSum, a) => partialSum + a.subTotal, 0) + Service_Charge : 0)}
        </span>
      </div>
    </div>
  );
}
