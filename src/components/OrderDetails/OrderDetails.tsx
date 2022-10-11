import './OrderDetails.scss';
import { FormattedAddress } from 'components/FormattedAddress/FormattedAddress';
import { OrderDto } from 'dtos/OrderDto';
import React, { ReactElement } from 'react';

interface Props {
  order: OrderDto;
}

export const OrderDetails = ({ order }: Props): ReactElement => {
  return (
    <div className="order_details">
      <div className="order_details__group">
        <span className="order_details__label">Order ID:</span>
        <span className="order_details__value">{order.id}</span>
      </div>
      <div className="order_details__group">
        <span className="order_details__label">Status:</span>
        <span className="order_details__value">{order.status}</span>
      </div>
      <div className="order_details__group">
        <span className="order_details__label">Address:</span>
        <div className="order_details__value">
          <FormattedAddress address={order.address} />
        </div>
      </div>
      <div className="order_details__group order_details__group--items">
        <span className="order_details__label">Items:</span>
        <div id="order_details__items">
          {order.items.length === 0 ? <p>There are no items in your order.</p> : null}
          {order.items.map((item) => (
            <div className="order_details__item" key={item.id}>
              <div className="order_details__item_group">
                <span className="order_details__item_quantity">{item.quantity}x</span>
                <span className="order_details__item_name">{item.name}</span>
              </div>
              <span className="order_details__item_price">£{(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="order_details__group order_details__group--total">
        <span className="order_details__label">Total:</span>
        <span className="order_details__value">£{order.total}</span>
      </div>
    </div>
  );
};
