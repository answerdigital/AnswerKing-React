import { useOrder } from 'hooks/useOrder';
import { ReactElement, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from 'utilities/route-constants';
import { useLocalOrder } from 'context/OrderContext';
import { CheckoutOrderDetails } from 'components/CheckoutOrderDetails/CheckoutOrderDetails';
import { Button } from 'components/Button/Button';
import { CreatedOrderDto } from 'dtos/Order/CreatedOrderDto';

export const CheckoutPage = (): ReactElement => {
  const { removeOrder, updateOrder, createOrder } = useOrder();
  const { localOrder } = useLocalOrder();
  const navigate = useNavigate();

  const placeOrder = (): void => {
    //TODO: user should be moved to a payment form
  };

  const handleLocalOrderChange = (): void => {
    if (localOrder.lineItems.length) {
      const orderLineItems = localOrder.lineItems.map((p) => ({ productId: p.product.id, quantity: p.quantity }));
      const createdOrder: CreatedOrderDto = { lineItems: orderLineItems };
      localOrder.id ? updateOrder.mutate({ id: localOrder.id, updatedOrder: createdOrder }) : createOrder.mutate(createdOrder);
    } else if (localOrder.id) {
      removeOrder.mutate(localOrder.id);
      localOrder.id = undefined;
    }
  };

  useEffect(handleLocalOrderChange, [localOrder]);

  const GBPFormat = new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: 'GBP',
  });

  return (
    <>
      <Helmet>
        <title>Checkout - Answer King</title>
      </Helmet>
      <div className="flex h-[46rem] flex-col items-center font-sans">
        <h1 className="flex h-1/6 items-center text-3xl">Checkout</h1>
        <form
          className="flex w-1/2 grow flex-col items-center rounded-lg bg-white p-6 p-6 font-sans text-gray-900"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="w-full flex-grow">
            <h1 className="text-xl font-bold">Order</h1>
            {localOrder.lineItems?.length > 0 ? <CheckoutOrderDetails /> : <p>No Items in your order.</p>}
          </div>
          <div className="flex h-[10%] w-full justify-between">
            <span className="font-bold">Total:</span>
            <span className="font-bold">{GBPFormat.format(localOrder.lineItems.reduce((partialSum, a) => partialSum + a.subTotal, 0))}</span>
          </div>
          <div className="flex w-full">
            <Button
              size="small"
              colour="clear"
              className={'flex-1 grow border border-solid border-[#A2AAB6]'}
              onClick={() => navigate(RouteConstants.MENU)}
            >
              Cancel
            </Button>
            {localOrder.lineItems?.length > 0 && (
              <Button size="small" colour="yellow" className={'flex-1 grow'} onClick={() => placeOrder}>
                Pay Now
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
