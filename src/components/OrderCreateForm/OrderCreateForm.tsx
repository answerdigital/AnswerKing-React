import { Button } from 'components/Buttons/Button';
import { useOrder } from 'hooks/useOrder';
import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from 'utilities/route-constants';
import { useLocalOrder } from 'context/OrderContext';
import { GBPFormat } from 'utilities/GBPFormat';
import { SERVICE_CHARGE } from 'utilities/variables';

export const OrderCreateForm = (): ReactElement => {
  const { order } = useOrder();
  const { localOrder, setOrderId } = useLocalOrder();
  const navigate = useNavigate();

  const lineItemsExist = localOrder.lineItems?.length > 0;

  useEffect(() => {
    if (!order.data?.id) {
      return;
    }

    setOrderId(order.data.id);
  }, [order.data?.id]);

  return (
    <div className="mt-auto px-2 text-center">
      <hr className="mb-2"></hr>
      {lineItemsExist && (
        <div className="flex w-full justify-between text-[12px] text-[#5A6675]">
          <span>Service Charge:</span>
          <span>{GBPFormat.format(0.5)}</span>
        </div>
      )}
      <div className="mt-2 mb-2 flex w-full justify-between text-[20px] font-[600] text-[#333F4C]">
        <span>Total:</span>
        <span>
          {GBPFormat.format(localOrder.lineItems.reduce((partialSum, a) => partialSum + a.subTotal, 0) + (lineItemsExist ? SERVICE_CHARGE : 0))}
        </span>
      </div>
      <div className="mb-1">
        <Button disabled={!lineItemsExist} size="medium" className="w-full" onClick={() => navigate(RouteConstants.CHECKOUT)} colour="yellow">
          Go to checkout
        </Button>
      </div>
    </div>
  );
};
