import { ReactElement } from 'react';
import { useLocalOrder } from 'context/OrderContext';
import { GBPFormat } from 'utilities/GBPFormat';
import cn from 'classnames';
import { TrashIcon } from 'components/Icons/TrashIcon';
import { QuantityIcon } from 'components/Icons/QuantityIcon';
import CheckoutBurgerImg from '../../assets/icon_checkout_no_items.png';
import { ComponentTransition } from 'components/Transitions/ComponentTransition';

export const LocalOrderDetails = (): ReactElement => {
  const tableElement = 'py-4 text-[#333F4C] font-[400] text-[14.5px] leading-[18px]';
  const { localOrder, decreaseProductQuantityOrRemove } = useLocalOrder();
  const lineItemsExist = localOrder.lineItems?.length > 0;
  return (
    <div className="relative flex grow flex-col items-center justify-between">
      <ComponentTransition lineItemsExist={lineItemsExist}>
        <div className="absolute top-[30%] left-[27%]">
          <img src={CheckoutBurgerImg} className="h-[60%] w-[90%] opacity-80"></img>
        </div>
      </ComponentTransition>
      <table className="w-full grow table-fixed justify-between">
        <tbody>
          {localOrder.lineItems?.length > 0 &&
            localOrder.lineItems.map((lineItem) => (
              <tr key={lineItem.product.id} className="flex w-full grow justify-between [&:not(:last-child)]:border-b">
                <td className={cn(tableElement, 'flex')}>
                  <QuantityIcon quantity={lineItem.quantity} />
                  <span className="self-center">{lineItem.product.name}</span>
                </td>
                <td className={cn(tableElement, 'float-right flex items-center justify-center')}>
                  <div className="items-center justify-center"></div>
                  <TrashIcon product={lineItem.product} />
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
