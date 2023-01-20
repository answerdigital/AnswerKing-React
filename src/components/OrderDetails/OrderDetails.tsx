import { MouseEventHandler, ReactElement } from 'react';
import cn from 'classnames';
import { GBPFormat } from 'utilities/GBPFormat';
import { LineItemDto } from 'dtos/LineItemDto';
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
    <div className="flex flex-col items-center justify-between">
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
                  <div className="items-center justify-center"></div>
                  <div className={cn(iconClass)}>
                    <div className="group cursor-pointer">
                      <svg
                        className="duration-300 group-hover:-translate-y-[1px] group-hover:rotate-[7deg]"
                        width="12"
                        height="3"
                        onClick={removeSelectedProduct(lineItem.product)}
                        viewBox="0 0 12 3"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="group-hover:group-hover:fill-red-600"
                          d="M8.75 1H11.5V3H0.5V1H3.25L4.03571 0H7.96428L8.75 1Z"
                          fill="#333F4C"
                        />
                      </svg>
                      <svg
                        className="ml-[1.3px]"
                        onClick={removeSelectedProduct(lineItem.product)}
                        width="9px"
                        height="10px"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          className="group-hover:fill-red-600"
                          d="M0.5 8.57143C0.5 8.95031 0.658035 9.31367 0.93934
                      9.58158C1.22064 9.84949 1.60218 10 2 10H8C8.39783 10 8.77936 9.84949 9.06066 9.58158C9.34196 9.31367 9.5 8.95031 9.5 8.57143V0H0.5V8.57143Z"
                          fill="#333F4C"
                        />
                      </svg>
                    </div>
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
