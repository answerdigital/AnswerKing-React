import { OrderFeesAndTotals } from 'components/OrderFeesAndTotals/OrderFeesAndTotals';
import { useLocalOrder } from 'context/OrderContext';
import { GBPFormat } from 'utilities/GBPFormat';
import { SERVICE_CHARGE } from 'utilities/variables';

interface Props {
  children: React.ReactNode;
}

export const CheckoutFooter = ({ children }: Props): React.ReactElement => {
  const { localOrder } = useLocalOrder();

  return (
    <div className="mt-auto">
      <OrderFeesAndTotals lineItems={localOrder.lineItems} />

      <div className="flex w-full gap-5 font-[400]">{children}</div>
    </div>
  );
};
