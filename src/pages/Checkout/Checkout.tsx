import { CheckoutDetails } from 'components/CheckoutDetails/CheckoutDetails';
import { useOrder } from 'hooks/useOrder';
import { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from 'components/Button/Button';

export const CheckoutPage = (): ReactElement => {
  const { order } = useOrder();
  return (
    <div>
      <Helmet>
        <title>Checkout - Answer King</title>
      </Helmet>
      <div className="checkout">
        {order && order.isFetched ? <CheckoutDetails order={order} /> : null}
        {order.isIdle ? <div>No order has been created</div> : null}
      </div>
      <Button size="small">Pay</Button>
      <Button size="small">Edit</Button>
      <Button size="small">Cancel</Button>
    </div>
  );
};
