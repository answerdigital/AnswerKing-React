import { ReactElement, useEffect } from 'react';
import Button from 'common/Buttons/Button';
import OrderFeesAndTotals from 'common/OrderFeesAndTotals/OrderFeesAndTotals';
import { useLocalOrder } from 'context/OrderContext';
import useOrder from 'hooks/useOrder';
import { useNavigate } from 'react-router-dom';
import PageRoutes from 'utilities/Constants/PageRoutes';

export default function OrderCreateForm(): ReactElement {
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
    <div data-testid="order-create-form" className="mt-auto px-2 text-center">
      <OrderFeesAndTotals lineItems={localOrder.lineItems} />
      <div className="mb-1">
        <Button
          disabled={!lineItemsExist}
          className="h-[45px] w-full"
          onClick={() => navigate(PageRoutes.CHECKOUT)}
          colour="yellow"
          data-testid="checkout"
        >
          Go to checkout
        </Button>
      </div>
    </div>
  );
}
