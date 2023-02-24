import { ReactElement } from 'react';
import cn from 'classnames';
import QuantityIcon from 'common/Icons/QuantityIcon';
import TrashIcon from 'common/Icons/TrashIcon';
import ComponentTransition from 'common/Transitions/ComponentTransition';
import { useLocalOrder } from 'context/OrderContext';
import GBPFormat from 'utilities/GBPFormat';
import CheckoutBurgerImg from '/images/icon_checkout_no_items.png';

export default function LocalOrderDetails(): ReactElement {
  const { localOrder, removeProduct } = useLocalOrder();
  const lineItemsExist = localOrder.lineItems?.length > 0;
  const tableElement = 'py-4 text-[#333F4C] font-[400] text-[14.5px] leading-[18px]';
  return (
    <div data-testid="local-order-details" className="relative flex grow flex-col items-center justify-between">
      <ComponentTransition lineItemsExist={lineItemsExist}>
        <div className="absolute top-[30%] left-[27%]">
          <img src={CheckoutBurgerImg} className="h-[60%] w-[90%] opacity-80" alt="checkout-burger" />
        </div>
      </ComponentTransition>
      <table className="w-full grow table-fixed justify-between">
        <tbody>
          {localOrder.lineItems?.length > 0 &&
            localOrder.lineItems.map((lineItem) => (
              <tr data-testid="product-row" key={lineItem.product.id} className="flex w-full grow justify-between [&:not(:last-child)]:border-b">
                <td className={cn(tableElement, 'flex')}>
                  <QuantityIcon quantity={lineItem.quantity} />
                  <span data-testid="name" className="self-center">
                    {lineItem.product.name}
                  </span>
                </td>
                <td className={cn(tableElement, 'float-right flex items-center justify-center')}>
                  <div className="items-center justify-center" />
                  <TrashIcon onClick={() => removeProduct(lineItem.product)} />
                  <div className="left-8 flex h-[21px] w-[50px] items-center justify-center">
                    <span data-testid="subtotal" className="text-center">
                      {GBPFormat.format(lineItem.subTotal)}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
