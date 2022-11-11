import './OrderDetails.scss';
import { OrderDto } from 'dtos/OrderDto';
import { ReactElement } from 'react';

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
        <span className="order_details__value">{order.orderStatus}</span>
      </div>
      <div className="order_details__group order_details__group--items">
        <span className="order_details__label">Items:</span>
        <div id="order_details__items">
          {order.lineItems?.length > 0 ? (
            order.lineItems.map((lineItem) => (
              <div className="order_details__item" key={lineItem.product.id}>
                <div className="order_details__item_group">
                  <span className="order_details__item_quantity">{lineItem.quantity}x</span>
                  <span className="order_details__item_name">{lineItem.product.name}</span>
                </div>
                <span className="order_details__item_price">£{lineItem.subTotal}</span>
              </div>
            ))
          ) : (
            <p>There are no items in your order.</p>
          )}
        </div>
      </div>

      <div className="order_details__group order_details__group--total">
        <span className="order_details__label">Total:</span>
        <span className="order_details__value">£{order.orderTotal}</span>
      </div>
    </div>
  );
};
