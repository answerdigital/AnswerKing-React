import { ReactElement } from 'react';
import { useLocalOrder } from 'context/OrderContext';
import { GBPFormat } from 'utilities/GBPFormat';
import cn from 'classnames';
import { TrashIcon } from 'components/Icons/TrashIcon';
import { QuantityIcon } from 'components/Icons/QuantityIcon';

export const LocalOrderDetails = (): ReactElement => {
  const tableElement = 'py-4 text-[#333F4C] font-[400] text-[14.5px] leading-[18px]';
  const { localOrder, decreaseProductQuantityOrRemove } = useLocalOrder();
  return (
    <div className="flex grow flex-col items-center justify-between">
      <table className="w-full table-fixed justify-between">
        <tbody>
          {localOrder.lineItems?.length > 0 &&
            localOrder.lineItems.map((lineItem) => (
              <tr key={lineItem.product.id} className="flex w-full justify-between [&:not(:last-child)]:border-b">
                <td className={cn(tableElement, 'flex')}>
                  <QuantityIcon quantity={lineItem.quantity} />
                  <span className="self-center">{lineItem.product.name}</span>
                </td>
                <td className={cn(tableElement, 'float-right flex items-center justify-center')}>
                  <div className="items-center justify-center"></div>
                  <button onClick={() => decreaseProductQuantityOrRemove(lineItem.product)}>
                    <TrashIcon product={lineItem.product} />
                  </button>
                  <div className="left-8 flex h-[21px] w-[50px] items-center justify-center">
                    <span className="text-center">{GBPFormat.format(lineItem.subTotal)}</span>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
