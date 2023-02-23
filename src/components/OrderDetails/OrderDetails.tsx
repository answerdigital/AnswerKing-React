import { ReactElement } from 'react';
import { GBPFormat } from 'utilities/GBPFormat';
import { LineItemDto } from 'dtos/LineItemDto';
import { TrashIcon } from 'components/Icons/TrashIcon';
import cn from 'classnames';
import { QuantityIcon } from 'components/Icons/QuantityIcon';
import { useLocalOrder } from 'context/OrderContext';

interface Props {
  items: LineItemDto[];
}

export const OrderDetails = ({ items }: Props): ReactElement => {
  const { removeProduct } = useLocalOrder();

  const tableElement = 'py-4 text-ak-grey-1 font-[400] text-xs';

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
                  <div className="items-center justify-center"></div>
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
};
