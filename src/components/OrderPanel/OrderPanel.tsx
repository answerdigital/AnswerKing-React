import './OrderPanel.scss';
import { Button } from 'components/Button/Button';
import { OrderCreateForm } from 'components/OrderCreateForm/OrderCreateForm';
import { OrderDetails } from 'components/OrderDetails/OrderDetails';
import { OrderLoadForm } from 'components/OrderLoadForm/OrderLoadForm';
import { useOrder } from 'hooks/useOrder';
import { ReactElement } from 'react';
import { OrderCreateDto } from 'dtos/CreatedOrderDto';

interface Props {
  state: OrderCreateDto;
}

export const OrderPanel = ({state}: Props): ReactElement => {
  const { order, clearOrder } = useOrder();

  const handleClear = (): void => clearOrder();

  return (
    <div className="order_panel">
      {state.lineItems.length > 0 ? (
        <>
          <OrderDetails state={state} />
          <div className="order_panel__button_group">
            <Button className="order_panel__button">
              Cancel
            </Button>
            <Button active className="order_panel__button">
              Checkout
            </Button>
          </div>
        </>
      ) : (
        <>
          <OrderLoadForm />
          <hr />
          <OrderCreateForm state={state}/>
        </>
      )}
    </div>
  );
};
