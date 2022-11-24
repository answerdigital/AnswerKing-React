import './OrderPanel.scss';
import { OrderCreateForm } from 'components/OrderCreateForm/OrderCreateForm';
import { OrderDetails } from 'components/OrderDetails/OrderDetails';
import { useOrder } from 'hooks/useOrder';
import { ReactElement } from 'react';
import { OrderCreateDto } from 'dtos/CreatedOrderDto';

interface Props {
  localOrder: OrderCreateDto;
}

export const OrderPanel = ({ localOrder }: Props): ReactElement => {
  const { order, clearOrder } = useOrder();

  const handleClear = (): void => clearOrder();

  return (
    <div className="order_panel">
      {localOrder.lineItems.length > 0 ? (
        <>
          <OrderDetails localOrder={localOrder} />
          <OrderCreateForm localOrder={localOrder} />
        </>
      ) : (
        <>
          <OrderCreateForm localOrder={localOrder} />
        </>
      )}
    </div>
  );
};
