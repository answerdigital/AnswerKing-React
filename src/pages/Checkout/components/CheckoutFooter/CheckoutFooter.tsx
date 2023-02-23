import { OrderFeesAndTotals } from 'common/OrderFeesAndTotals/OrderFeesAndTotals';
import { useLocalOrder } from 'context/OrderContext';
import { ReactElement } from 'react';

interface Props {
  children: React.ReactNode;
}

export const CheckoutFooter = ({ children }: Props): ReactElement => {
  const { localOrder } = useLocalOrder();

  return (
    <>
      <OrderFeesAndTotals lineItems={localOrder.lineItems} />
      <div className="flex gap-5 font-normal">{children}</div>
    </>
  );
};
