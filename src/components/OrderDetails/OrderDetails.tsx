import { ReactElement } from 'react';
import cn from 'classnames';
import { GBPFormat } from 'utilities/GBPFormat';
import { LineItemDto } from 'dtos/LineItemDto';

interface Props {
  items: LineItemDto[];
}

export const OrderDetails = ({ items }: Props): ReactElement => {
  const iconClass = 'border rounded bg-gray-200 p-2 text-[12px]';

  const tableElement = 'whitespace-nowrap px-6 py-4 font-medium text-[#333F4C]';

  return (
    <div className="flex h-full flex-col items-center justify-between">
      <table className="w-full table-fixed">
        <tbody className="flex">
          {items.length > 0 ? (
            items.map((lineItem) => (
              <tr key={lineItem.product.id} className="border-b">
                <td className={tableElement}>
                  <span className={cn(iconClass, 'rounded bg-gray-200 text-center mr-4')}>{lineItem.quantity}</span>
                  <span>{lineItem.product.name}</span>
                </td>
                <td className={tableElement}>
                  <span>{GBPFormat.format(lineItem.subTotal)}</span>
                </td>
              </tr>
            ))
          ) : (
            <p className="text-[16px]">No items in order.</p>
          )}
        </tbody>
      </table>
      <div className="w-full text-[22px] text-[#333F4C]">
        <div className="flex justify-between w-full text-[#5A6675] text-[15px]">
          <span className="">Service Charge:</span>
          <span className="">£0.50</span>
        </div>
        <div className="flex justify-between w-full font-bold mt-2">
          <span>Total:</span>
          <span>{GBPFormat.format(items.reduce((partialSum, a) => partialSum + a.subTotal, 0))}</span>
        </div>
      </div>
    </div>
  );
};
