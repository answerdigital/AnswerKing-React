import { useLocalOrder } from 'context/OrderContext';
import { GBPFormat } from 'utilities/GBPFormat';
import { SERVICE_CHARGE } from 'utilities/variables';

interface Props {
  children: React.ReactNode;
}

export const CheckoutFooter = ({ children }: Props): React.ReactElement => {
  const { localOrder } = useLocalOrder();
  const orderExists = localOrder.lineItems.length > 0;

  return (
    <div className="mt-auto">
      <hr className="mb-6 px-1"></hr>

      <div className="flex w-full justify-between text-[11px] text-[#5A6675] transition-all duration-300">
        <span>Service Charge:</span>
        <span>{GBPFormat.format(SERVICE_CHARGE)}</span>
      </div>

      <div className="mt-2 mb-4 flex w-full justify-between text-[20px] font-[600] text-[#333F4C]">
        <span>Total:</span>
        <span>
          {GBPFormat.format(localOrder.lineItems.reduce((partialSum, a) => partialSum + a.subTotal, 0) + (orderExists ? SERVICE_CHARGE : 0))}
        </span>
      </div>

      <div className="flex w-full gap-5 font-[400]">{children}</div>
    </div>
  );
};
