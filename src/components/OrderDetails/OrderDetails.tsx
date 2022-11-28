import './OrderDetails.scss';
import { ReactElement } from 'react';
import { LocalOrderDto } from 'dtos/Order/LocalOrderDto';

interface Props {
  localOrder: LocalOrderDto;
}

export const OrderDetails = ({ localOrder }: Props): ReactElement => {
  const total = localOrder.lineItems.map((item) => item.subTotal).reduce((a, b) => a + b, 0);
  return (
    <div className="order_details">
      <div className="order_details__group order_details__group--items">
        <span className="order_details__label">Products:</span>
        <div id="order_details__items">
          {localOrder.lineItems?.length > 0 ? (
            localOrder.lineItems.map((lineItem) => (
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
        <span className="order_details__value">£{Math.round(total * 1e2) / 1e2}</span>
      </div>
    </div>
  );
};
