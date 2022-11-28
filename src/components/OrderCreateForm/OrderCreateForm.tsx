import './OrderCreateForm.scss';
import { Button } from 'components/Button/Button';
import { LoaderOverlay } from 'components/LoaderOverlay/LoaderOverlay';
import { useOrder } from 'hooks/useOrder';
import { FormEvent, ReactElement } from 'react';
import { LocalOrderDto } from 'dtos/Order/LocalOrderDto';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from 'utilities/route-constants';
import { CreatedOrderDto } from 'dtos/Order/CreatedOrderDto';

interface Props {
  localOrder: LocalOrderDto;
}

export const OrderCreateForm = ({ localOrder }: Props): ReactElement => {
  const { createOrder } = useOrder();
  const navigate = useNavigate();

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();

    const orderLineItems = localOrder.lineItems.map((p) => ({ productId: p.product.id, quantity: p.quantity }));
    const createdOrder: CreatedOrderDto = { lineItems: orderLineItems };

    createOrder.mutate(createdOrder);

    if (!createOrder.error) {
      navigate(RouteConstants.CHECKOUT);
    }
  };

  return (
    <form className="order_create_form" onSubmit={handleSubmit}>
      <LoaderOverlay isEnabled={createOrder.isLoading} />
      <Button className="order_create_form__button" type="submit">
        Checkout
      </Button>
    </form>
  );
};
