import { ReactElement } from 'react';
import cn from 'classnames';
import { GBPFormat } from 'utilities/GBPFormat';
import { LineItemDto } from 'dtos/LineItemDto';

interface Props {
  items: LineItemDto[];
}

export const OrderDetails = ({ items }: Props): ReactElement => {
  const iconClass = 'border rounded bg-gray-200 p-2';

  const tableElement = 'whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900';

  return (
    <div className="flex h-full flex-col items-center justify-between">
      <table className="w-full table-fixed">
        <tbody className="flex-none">
          {items.length > 0 ? (
            items.map((lineItem) => (
              <tr key={lineItem.product.id} className="border-b">
                <td className={tableElement}>
                  <span className={cn(iconClass, 'rounded bg-gray-200 text-center')}>{lineItem.quantity}</span>
                </td>
                <td className={cn(tableElement, 'w-2/3')}>
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
      <div className="flex w-full justify-between">
        <span className="font-bold">Total:</span>
        <span className="font-bold">{GBPFormat.format(items.reduce((partialSum, a) => partialSum + a.subTotal, 0))}</span>
      </div>
    </div>
  );
};
