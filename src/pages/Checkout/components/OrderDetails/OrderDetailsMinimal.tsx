import { ReactElement } from 'react';
import { LineItemDto } from 'dtos/LineItemDto';
import GBPFormat from 'utilities/GBPFormat';

interface Props {
  items: LineItemDto[];
}

export default function OrderDetailsMinimal({ items }: Props): ReactElement {
  return (
    <table className="w-full table-fixed text-xs">
      <tbody>
        {items.map((lineItem) => (
          <tr key={lineItem.product.id} className="flex justify-between py-2 [&:not(:last-child)]:border-b">
            <td>
              <span className="self-center">{lineItem.quantity}x </span>
              <span className="self-center">{lineItem.product.name}</span>
            </td>
            <td>
              <span className="text-center">{GBPFormat.format(lineItem.subTotal)}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
