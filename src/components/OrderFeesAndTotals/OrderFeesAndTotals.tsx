import { GBPFormat } from 'utilities/GBPFormat';
import { SERVICE_CHARGE } from 'utilities/variables';
import { LineItemDto } from 'dtos/LineItemDto';
import cn from 'classnames';

interface Props {
  lineItems: LineItemDto[];
  orderComplete?: boolean;
}

export const OrderFeesAndTotals = ({ lineItems, orderComplete }: Props): React.ReactElement => {
  return (
    <div className="mb-3 w-full text-[22px]">
      <hr className="mb-6 px-1"></hr>

      {lineItems.length > 0 && !orderComplete && (
        <div className="flex w-full justify-between text-[11px] text-[#5A6675] transition-all duration-300">
          <span>Service Charge:</span>
          <span>{GBPFormat.format(SERVICE_CHARGE)}</span>
        </div>
      )}

      <div className={cn('mt-2 mb-4 flex w-full justify-between text-[20px] font-[600] text-[#333F4C]')}>
        <span>{orderComplete ? 'Paid' : 'Total'}:</span>
        <span>{GBPFormat.format(lineItems.length > 0 ? lineItems.reduce((partialSum, a) => partialSum + a.subTotal, 0) + SERVICE_CHARGE : 0)}</span>
      </div>
    </div>
  );
};
