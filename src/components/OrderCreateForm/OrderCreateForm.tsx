import './OrderCreateForm.scss';
import { Button } from 'components/Button/Button';
import { LoaderOverlay } from 'components/LoaderOverlay/LoaderOverlay';
import { useOrder } from 'hooks/useOrder';
import { FormEvent, ReactElement } from 'react';
import { OrderCreateDto } from 'dtos/OrderCreateDto';

interface Props {
  localOrder: OrderCreateDto;
}

export const OrderCreateForm = ({ localOrder }: Props): ReactElement => {
  const { createOrder} = useOrder();

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();
    const orderCreateDto: OrderCreateDto = localOrder;
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
