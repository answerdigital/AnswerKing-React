import { ReactElement } from 'react';
import { GBPFormat } from 'utilities/GBPFormat';
import { LineItemDto } from 'dtos/LineItemDto';
import { TrashIcon } from 'components/Icons/TrashIcon';
import cn from 'classnames';

interface Props {
  items: LineItemDto[];
}

export const OrderDetails = ({ items }: Props): ReactElement => {
  const iconClass = 'w-[35px] h-[35px] flex items-center justify-center rounded mr-[24px] border rounded bg-[#E4EAEB]';
  const tableElement = 'py-4 text-[#333F4C] font-[400] text-[12px] leading-[18px]';

  return (
    <div data-testid="order-item-list" className="flex flex-col items-center justify-between">
      <table className="w-full table-fixed justify-between">
        <tbody>
          {items.length > 0 ? (
            items.map((lineItem) => (
              <tr key={lineItem.product.id} className="flex w-full justify-between [&:not(:last-child)]:border-b">
                <td className={cn(tableElement, 'flex')}>
                  <span data-testid="item-quantity" className={cn(iconClass, 'rounded text-center text-[18px] font-[400]')}>{lineItem.quantity}</span>
                  <span data-testid="item-name" className="self-center text-[16px]">{lineItem.product.name}</span>
                </td>
                <td className={cn(tableElement, 'float-right flex items-center justify-center')}>
                  <div className="items-center justify-center"></div>
                  <TrashIcon product={lineItem.product} />
                  <div className="left-8 flex h-[21px] w-[50px] items-center justify-center text-[16px]">
                    <span data-testid="item-subtotal" className="text-center">{GBPFormat.format(lineItem.subTotal)}</span>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <p className="text-[16px]">No items in order.</p>
          )}
        </tbody>
      </table>
    </div>
  );
};
