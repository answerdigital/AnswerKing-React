import './OrderCreateForm.scss';
import { Button } from 'components/Button/Button';
import { Error } from 'components/Error/Error';
import { LoaderOverlay } from 'components/LoaderOverlay/LoaderOverlay';
import { useOrder } from 'hooks/useOrder';
import { FormEvent, ReactElement, useState } from 'react';
import { OrderCreateDto } from 'dtos/OrderCreateDto';
import { orderService } from '../../services/orderService';

interface Props {
  state: OrderCreateDto;
}

export const OrderCreateForm = ({state}: Props): ReactElement => {
  const [validationMessage, setValidationMessage] = useState('');
  const { createOrder, order} = useOrder();

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    const orderCreateDto: OrderCreateDto = { lineItems: state.lineItems };
    createOrder.mutate(orderCreateDto);
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
