import { Button } from 'components/Button/Button';
import { LoaderOverlay } from 'components/LoaderOverlay/LoaderOverlay';
import { useOrder } from 'hooks/useOrder';
import { FormEvent, ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from 'utilities/route-constants';
import { CreatedOrderDto } from 'dtos/Order/CreatedOrderDto';
import { useLocalOrder } from 'context/OrderContext';

export const OrderCreateForm = (): ReactElement => {
  const { order, createOrder, updateOrder } = useOrder();
  const { localOrder, setOrderId } = useLocalOrder();
  const navigate = useNavigate();

  const total = localOrder.lineItems.map((item) => item.subTotal).reduce((a, b) => a + b, 0);

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();

    const orderLineItems = localOrder.lineItems.map((p) => ({ productId: p.product.id, quantity: p.quantity }));
    const createdOrder: CreatedOrderDto = { lineItems: orderLineItems };

    if (!localOrder.id) {
      createOrder.mutate(createdOrder);
    } else {
      updateOrder.mutate({ id: localOrder.id, updatedOrder: createdOrder });
    }

    navigate(RouteConstants.CHECKOUT);
  };

  useEffect(() => {
    if (!order.data?.id) {
      return;
    }

    setOrderId(order.data.id);
  }, [order.data?.id]);

  return (
    <div className="mt-auto px-5 text-center">
      <hr className="mb-2"></hr>
      <div className="mb-3 flex text-xs">
        <span className="font-thin text-gray-800">Service charge: </span>
        <span className="ml-auto font-thin text-gray-800">£0.50</span>
      </div>
      <div className="mb-5 flex text-xs">
        <span className="font-thin text-gray-800">Delivery fee: </span>
        <span className="ml-auto font-thin text-gray-800">£2.00</span>
      </div>
      <div className="mb-5 flex text-xl">
        <span className="font-semibold text-gray-800">Total: </span>
        <span className="ml-auto font-semibold text-gray-800">£{Math.round(total * 1e2) / 1e2}</span>
      </div>
      <form className="mb-1" onSubmit={handleSubmit}>
        <LoaderOverlay isEnabled={createOrder.isLoading} />
        <Button size="large" className="text-1 font-poppins w-full py-2 px-4 text-sm font-semibold" type="submit" colour="yellow">
          Go to checkout
        </Button>
      </form>
    </div>
  );
};
