import { ReactElement } from 'react';
import { useLocalOrder } from 'context/OrderContext';
import { GBPFormat } from 'utilities/GBPFormat';
import cn from 'classnames';
import { TrashIcon } from 'components/Icons/TrashIcon';

export const LocalOrderDetails = (): ReactElement => {
  const iconClass = 'w-[30px] h-[30px] flex items-center justify-center rounded mr-[24px] border rounded bg-[#E4EAEB]';
  const tableElement = 'py-4 text-[#333F4C] font-[400] text-[12px] leading-[18px]';
  const { localOrder, decreaseProductQuantityOrRemove } = useLocalOrder();
  return (

    <div className="flex flex-col items-center justify-between grow">
      <table className="w-full table-fixed justify-between">
        <tbody>
          {localOrder.lineItems?.length > 0 ? (
            localOrder.lineItems.map((lineItem) => (
              <tr key={lineItem.product.id} className="flex w-full justify-between [&:not(:last-child)]:border-b">
                <td className={cn(tableElement, 'flex')}>
                  <span className={cn(iconClass, 'rounded text-center text-[14px]')}>{lineItem.quantity}</span>
                  <span className="self-center">{lineItem.product.name}</span>
                </td>
                <td className={cn(tableElement, 'float-right flex items-center justify-center')}>
                  <div className="items-center justify-center"></div>
                  <button  onClick={() => decreaseProductQuantityOrRemove(lineItem.product)}>
                    <TrashIcon product={lineItem.product} />
                  </button>
                  <div className="left-8 flex h-[21px] w-[50px] items-center justify-center">
                    <span className="text-center">{GBPFormat.format(lineItem.subTotal)}</span>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="text-[16px]">No items in order.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
