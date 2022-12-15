import { ReactElement } from 'react';
import { useLocalOrder } from 'context/OrderContext';
import cn from 'classnames';

export const CheckoutOrderDetails = (): ReactElement => {
  const { localOrder } = useLocalOrder();

  const iconClass = 'border rounded bg-gray-200 p-2';

  const tableElement = 'whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900';


  const GBPFormat = new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: 'GBP',
  });

  return (
    <div className="font-sans text-[16px]">
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full table-fixed">
                <tbody>
                  {localOrder.lineItems?.length > 0 ? (
                    localOrder.lineItems.map((lineItem) => (
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
                    <p className="text-[16px]">There are no items in your order.</p>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
