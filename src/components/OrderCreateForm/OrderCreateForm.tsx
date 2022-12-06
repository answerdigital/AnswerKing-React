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

    if (!createOrder.error || !updateOrder.error) {
      navigate(RouteConstants.CHECKOUT);
    }
  };

  useEffect(() => {
    if (!order.data?.id) {
      return;
    }

    setOrderId(order.data.id);
  }, [order.data?.id]);

  return (
    <div className="mt-auto px-5 text-center">
      <div className="mb-5 flex text-[20px]">
        <span className="">Total: </span>
        <span className="ml-auto">£{Math.round(total * 1e2) / 1e2}</span>
      </div>
      <form className="mb-1" onSubmit={handleSubmit}>
        <LoaderOverlay isEnabled={createOrder.isLoading} />
        <Button size="large" className="text-1 py-2 px-24 font-normal" type="submit">
          Checkout
        </Button>
      </form>
    </div>
  );
};
