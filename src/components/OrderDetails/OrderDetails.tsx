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
  const iconClass = 'w-[30px] h-[30px] flex items-center justify-center rounded mr-[24px] border rounded bg-[#E4EAEB]';
  const tableElement = 'py-4 text-[#333F4C] font-[400] text-[12px] leading-[18px]';

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
              <tr key={lineItem.product.id} className="flex w-full justify-between [&:not(:last-child)]:border-b">
                <td className={cn(tableElement, 'flex')}>
                  <span className={cn(iconClass, 'rounded text-center text-[14px]')}>{lineItem.quantity}</span>
                  <span className="self-center">{lineItem.product.name}</span>
                </td>
                <td className={cn(tableElement, 'float-right flex items-center justify-center')}>
                  <div className={cn(iconClass)}>
                    <FontAwesomeIcon
                      className="h-[16px] w-[15px] cursor-pointer hover:text-red-600"
                      icon={faTrash}
                      onClick={removeSelectedProduct(lineItem.product)}
                    />
                  </div>
                  <div className="left-8 flex h-[21px] w-[50px] items-center justify-center">
                    <span className="text-center">{GBPFormat.format(lineItem.subTotal)}</span>
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
