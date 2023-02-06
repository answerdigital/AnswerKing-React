import { ReactElement } from 'react';
import { GBPFormat } from 'utilities/GBPFormat';
import { LineItemDto } from 'dtos/LineItemDto';
interface Props {
  items: LineItemDto[];
}

export const OrderDetailsMinimal = ({ items }: Props): ReactElement => {
  return (
    <table className="w-full table-fixed text-[12px]">
      <tbody>
        {items.length > 0 ? (
          items.map((lineItem) => (
            <tr key={lineItem.product.id} className="flex justify-between py-2 [&:not(:last-child)]:border-b">
              <td>
                <span className="self-center">{lineItem.quantity}x </span>
                <span className="self-center">{lineItem.product.name}</span>
              </td>
              <td>
                <span className="text-center">{GBPFormat.format(lineItem.subTotal)}</span>
              </td>
            </tr>
          ))
        ) : (
          <p>No items in order.</p>
        )}
      </tbody>
    </table>
  );
};
