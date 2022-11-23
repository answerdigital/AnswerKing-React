import './OrderPanel.scss';
import { OrderCreateForm } from 'components/OrderCreateForm/OrderCreateForm';
import { OrderDetails } from 'components/OrderDetails/OrderDetails';
import { useOrder } from 'hooks/useOrder';
import { ReactElement } from 'react';
import { OrderCreateDto } from 'dtos/CreatedOrderDto';

interface Props {
  state: OrderCreateDto;
}

export const OrderPanel = ({ state }: Props): ReactElement => {
  const { order, clearOrder } = useOrder();

  const handleClear = (): void => clearOrder();

  return (
    <div className="order_panel">
      {state.lineItems.length > 0 ? (
        <>
          <OrderDetails state={state} />
          <OrderCreateForm state={state} />
        </>
      ) : (
        <>
          <OrderCreateForm state={state} />
        </>
      )}
    </div>
  );
};
