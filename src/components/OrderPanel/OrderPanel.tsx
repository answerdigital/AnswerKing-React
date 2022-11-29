import './OrderPanel.scss';
import { OrderCreateForm } from 'components/OrderCreateForm/OrderCreateForm';
import { OrderDetails } from 'components/OrderDetails/OrderDetails';
import { ReactElement } from 'react';
import { useLocalOrder } from 'context/OrderContext';

export const OrderPanel = (): ReactElement => {
  const { localOrder } = useLocalOrder();

  return (
    <div className="order_panel">
      {localOrder.lineItems.length > 0 ? (
        <>
          <OrderDetails />
          <OrderCreateForm />
        </>
      ) : (
        <>
          <OrderCreateForm />
        </>
      )}
    </div>
  );
};
