import { ReactElement } from 'react';
import cn from 'classnames';
import QuantityIcon from 'common/Icons/QuantityIcon';
import TrashIcon from 'common/Icons/TrashIcon';
import { useLocalOrder } from 'context/OrderContext';
import LineItemDto from 'dtos/LineItemDto';
import GBPFormat from 'utilities/GBPFormat';

interface Props {
  items: LineItemDto[];
}

export default function OrderDetails({ items }: Props): ReactElement {
  const { removeProduct } = useLocalOrder();

  const tableElement = 'py-4 text-ak-grey-1 font-normal text-xs';

  return (
    <div data-testid="order-details" className="flex flex-col items-center">
      <table className="w-full table-fixed justify-between">
        <tbody>
          {items.length > 0 ? (
            items.map((lineItem) => (
              <tr key={lineItem.product.id} className="flex w-full justify-between [&:not(:last-child)]:border-b">
                <td className={cn(tableElement, 'flex')}>
                  <QuantityIcon quantity={lineItem.quantity} />
                  <span data-testid="item-name" className="self-center text-sm">
                    {lineItem.product.name}
                  </span>
                </td>
                <td className={cn(tableElement, 'float-right flex items-center justify-center')}>
                  <div className="items-center justify-center" />
                  <TrashIcon onClick={() => removeProduct(lineItem.product)} />
                  <div className="left-8 flex h-[21px] w-[50px] items-center justify-center text-sm">
                    <span data-testid="item-subtotal" className="text-center">
                      {GBPFormat.format(lineItem.subTotal)}
                    </span>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <p className="text-base">No items in order.</p>
          )}
        </tbody>
      </table>
    </div>
  );
}
