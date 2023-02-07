import { Button } from 'components/Buttons/Button';
import { useOrder } from 'hooks/useOrder';
import { ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from 'utilities/route-constants';
import { useLocalOrder } from 'context/OrderContext';
import { OrderFeesAndTotals } from 'components/OrderFeesAndTotals/OrderFeesAndTotals';

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
      <OrderFeesAndTotals lineItems={localOrder.lineItems} />
      <div className="mb-1">
        <Button disabled={!lineItemsExist} size="medium" className="w-full" onClick={() => navigate(RouteConstants.CHECKOUT)} colour="yellow">
          Go to checkout
        </Button>
      </div>
    </div>
  );
};
