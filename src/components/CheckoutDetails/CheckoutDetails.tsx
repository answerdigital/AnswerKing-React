import { OrderDto } from 'dtos/Order/OrderDto';
import { ReactElement } from 'react';
import { UseQueryResult } from 'react-query';

interface Props {
  order: UseQueryResult<OrderDto>;
}

export const CheckoutDetails = ({ order }: Props): ReactElement => {
  return (
    <div>
      <div>
        <span>Order ID:</span>
        <span>{order.data?.id}</span>
      </div>
      <div>
        <span>Status:</span>
        <span>{order.data?.orderStatus}</span>
      </div>
      <div>
        <span>Items:</span>
        <div>
          {order.data?.lineItems.length === 0 ? <p>There are no items in your order.</p> : null}
          {order.data?.lineItems.map((item) => (
            <div key={item.product.id}>
              <div>
                <span>{item.quantity}x</span>
                <span>{item.product.name}</span>
              </div>
              <span>£{(item.product.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <span>Total:</span>
        <span>£{order.data?.orderTotal}</span>
      </div>
    </div>
  );
};
