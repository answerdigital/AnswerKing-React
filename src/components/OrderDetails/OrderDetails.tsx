import { ReactElement } from 'react';
import cn from 'classnames';
import { GBPFormat } from 'utilities/GBPFormat';
import { LineItemDto } from 'dtos/LineItemDto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useLocalOrder } from 'context/OrderContext';

interface Props {
  items: LineItemDto[];
}

export const OrderDetails = ({ items }: Props): ReactElement => {
  const { removeProduct } = useLocalOrder();
  const iconClass = 'border rounded bg-gray-200 p-2 px-4 text-[19px] font-[400]';
  const tableElement = 'whitespace-nowrap px-6 py-4 font-medium text-[#333F4C] text-[17px]';

  return (
    <div className="flex h-full flex-col items-center justify-between">
      <table className="w-full justify-between table-fixed">
        <tbody className="">
          {items.length > 0 ? (
            items.map((lineItem) => (
              <tr key={lineItem.product.id} className="border-b pb-1">
                <td className={tableElement}>
                  <span className={cn(iconClass, 'mr-4 rounded bg-gray-200 text-center')}>{lineItem.quantity}</span>
                  <span>{lineItem.product.name}</span>
                </td>
                <td className={cn(tableElement, 'text-right')}>
                  <span className="mr-8 rounded bg-[#E4EAEB] p-2 text-[17px]">
                    <FontAwesomeIcon className="cursor-pointer" icon={faTrash} onClick={() => removeProduct(lineItem.product)}/>
                  </span>
                  <span>{GBPFormat.format(lineItem.subTotal)}</span>
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
