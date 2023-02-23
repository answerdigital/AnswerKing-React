import { GBPFormat } from 'utilities/GBPFormat';
import { SERVICE_CHARGE } from 'utilities/variables';
import { LineItemDto } from 'dtos/LineItemDto';
import cn from 'classnames';
import { ReactElement } from 'react';

interface Props {
  lineItems: LineItemDto[];
  orderComplete?: boolean;
}

export const OrderFeesAndTotals = ({ lineItems, orderComplete }: Props): ReactElement => {
  return (
    <div data-testid="order-fees-totals" className="mb-3 w-full">
      <hr className="mb-6 px-1"></hr>

      {lineItems.length > 0 && !orderComplete && (
        <div className="text-ak-grey-2 flex w-full justify-between text-[11px] transition-all duration-300">
          <span>Service Charge:</span>
          <span data-testid="service-charge">{GBPFormat.format(SERVICE_CHARGE)}</span>
        </div>
      )}

      <div className={cn('text-ak-grey-1 mt-2 mb-4 flex w-full justify-between text-xl font-semibold')}>
        <span>{orderComplete ? 'Paid' : 'Total'}:</span>
        <span data-testid="total">
          {GBPFormat.format(lineItems.length > 0 ? lineItems.reduce((partialSum, a) => partialSum + a.subTotal, 0) + SERVICE_CHARGE : 0)}
        </span>
      </div>
    </div>
  );
};
