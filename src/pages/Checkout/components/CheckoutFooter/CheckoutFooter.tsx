import { ReactElement } from 'react';
import OrderFeesAndTotals from 'common/OrderFeesAndTotals/OrderFeesAndTotals';
import { useLocalOrder } from 'context/OrderContext';

interface Props {
  children: React.ReactNode;
}

export default function CheckoutFooter({ children }: Props): ReactElement {
  const { localOrder } = useLocalOrder();

  return (
    <>
      <OrderFeesAndTotals lineItems={localOrder.lineItems} />
      <div className="flex gap-5 font-normal">{children}</div>
    </>
  );
}
