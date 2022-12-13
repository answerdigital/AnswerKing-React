import { useOrder } from 'hooks/useOrder';
import { ReactElement, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from 'utilities/route-constants';
import { toast } from 'react-toastify';
import { useLocalOrder } from 'context/OrderContext';
import { CheckoutOrderDetails } from 'components/CheckoutOrderDetails/CheckoutOrderDetails';
import { Button } from 'components/Button/Button';
import { CreatedOrderDto } from 'dtos/Order/CreatedOrderDto';

export const CheckoutPage = (): ReactElement => {
  const { order, removeOrder, updateOrder, createOrder } = useOrder();
  const { localOrder, removeLocalOrder } = useLocalOrder();
  const navigate = useNavigate();

  const cancelOrder = (): void => {
    if (order.data) {
      removeOrder.mutate(order.data.id, {
        onSuccess: () => {
          removeLocalOrder();
          toast.success('Order was succesfully cancelled.');
        },
      });
    }
  };

  const placeOrder = (): void => {
    //TODO: user should be moved to a payment form
  };

  const handleChange = (): void => {
    if (localOrder.lineItems.length) {
      const orderLineItems = localOrder.lineItems.map((p) => ({ productId: p.product.id, quantity: p.quantity }));
      const createdOrder: CreatedOrderDto = { lineItems: orderLineItems };
      if (localOrder.id) {
        updateOrder.mutate({ id: localOrder.id, updatedOrder: createdOrder });
      } else {
        createOrder.mutate(createdOrder);
      }
    } else {
      if (localOrder.id) {
        removeOrder.mutate(localOrder.id);
        localOrder.id = undefined;
      }
    }
  };

  useEffect(() => {
    handleChange();
  }, [localOrder]);

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
          <div className="flex w-full">
            <Button
              size="small"
              colour="clear"
              className={'flex-1 grow border border-solid border-[#A2AAB6]'}
              onClick={() => navigate(RouteConstants.MENU)}
            >
              Return to Menu
            </Button>
            {localOrder.lineItems?.length > 0 && (
              <Button size="small" colour="yellow" className={'flex-1 grow'} onClick={() => placeOrder}>
                Place Order
              </Button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
