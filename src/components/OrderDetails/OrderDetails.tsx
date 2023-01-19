import { MouseEventHandler, ReactElement } from 'react';
import cn from 'classnames';
import { GBPFormat } from 'utilities/GBPFormat';
import { LineItemDto } from 'dtos/LineItemDto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useLocalOrder } from 'context/OrderContext';
import { ProductDto } from 'dtos/ProductDto';

interface Props {
  items: LineItemDto[];
}

export const OrderDetails = ({ items }: Props): ReactElement => {
  const { removeProduct } = useLocalOrder();
  const iconClass = 'border rounded bg-gray-200 p-2 px-4 text-[19px] font-[400]';
  const tableElement = 'py-4 text-[#333F4C] font-[400] text-[17px]';

  function removeSelectedProduct(product: ProductDto): MouseEventHandler<SVGSVGElement> {
    return () => {
      removeProduct(product);
    };
  }

  return (
    <div className="flex h-full flex-col items-center justify-between">
      <table className="w-full table-fixed justify-between">
        <tbody>
          {items.length > 0 ? (
            items.map((lineItem) => (
              <tr key={lineItem.product.id} className="border-b">
                <td className={tableElement}>
                  <span className={cn(iconClass, 'mr-4 rounded bg-gray-200 text-center')}>{lineItem.quantity}</span>
                  <span>{lineItem.product.name}</span>
                </td>
                <td className={cn(tableElement, 'text-right')}>
                  <span className="mr-8 rounded bg-[#E4EAEB] p-2 text-[17px]">
                    <FontAwesomeIcon className="cursor-pointer hover:text-red-600" icon={faTrash} onClick={removeSelectedProduct(lineItem.product)} />
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
