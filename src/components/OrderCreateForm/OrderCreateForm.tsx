import './OrderCreateForm.scss';
import { Button } from 'components/Button/Button';
import { LoaderOverlay } from 'components/LoaderOverlay/LoaderOverlay';
import { useOrder } from 'hooks/useOrder';
import { FormEvent, ReactElement, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from 'utilities/route-constants';
import { CreatedOrderDto } from 'dtos/Order/CreatedOrderDto';
import { useLocalOrder } from 'context/OrderContext';

export const OrderCreateForm = (): ReactElement => {
  const { order, createOrder, updateOrder } = useOrder();
  const { localOrder, setOrderId } = useLocalOrder();
  const navigate = useNavigate();

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
    <form className="order_create_form" onSubmit={handleSubmit}>
      <LoaderOverlay isEnabled={createOrder.isLoading} />
      <Button className="order_create_form__button" type="submit">
        Checkout
      </Button>
    </form>
  );
};
