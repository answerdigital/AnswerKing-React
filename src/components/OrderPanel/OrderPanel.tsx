import './OrderPanel.scss';
import { Button } from 'components/Button/Button';
import { OrderCreateForm } from 'components/OrderCreateForm/OrderCreateForm';
import { OrderDetails } from 'components/OrderDetails/OrderDetails';
import { OrderLoadForm } from 'components/OrderLoadForm/OrderLoadForm';
import { useOrder } from 'hooks/useOrder';
import { ReactElement } from 'react';

interface Props {
  toggleOrderPanel(): void;
}

export const OrderPanel = ({ toggleOrderPanel }: Props): ReactElement => {
  const { order, clearOrder } = useOrder();

  const handleClear = (): void => clearOrder();

  return (
    <div className="translucent_overlay">
      <div className="order_panel">
        <div
          className="order_panel__close"
          onClick={toggleOrderPanel}
          onKeyDown={toggleOrderPanel}
          role="button"
          tabIndex={0}
        >
          &times;
        </div>
        {order.data ? (
          <>
            <OrderDetails order={order.data} />
            <div className="order_panel__button_group">
              <Button className="order_panel__button" onClick={handleClear}>
                Cancel
              </Button>
              <Button active className="order_panel__button" onClick={handleClear}>
                Checkout
              </Button>
            </div>
          </>
        ) : (
          <>
            <OrderLoadForm />
            <hr />
            <OrderCreateForm />
          </>
        )}
      </div>
    </div>
  );
};
