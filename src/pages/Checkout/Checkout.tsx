import { CheckoutDetails } from 'components/CheckoutDetails/CheckoutDetails';
import { useOrder } from 'hooks/useOrder';
import { ReactElement } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from 'components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from 'utilities/route-constants';

export const CheckoutPage = (): ReactElement => {
  const { order } = useOrder();
  const navigate = useNavigate();

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
      <Button size="small" onClick={() => navigate(RouteConstants.MENU)}>
        Edit
      </Button>
      <Button size="small">Cancel</Button>
    </div>
  );
};
