import { useOrder } from 'hooks/useOrder';
import { ReactElement, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from 'utilities/route-constants';
import { toast } from 'react-toastify';
import { useLocalOrder } from 'context/OrderContext';
import { CheckoutOrderDetails } from 'components/CheckoutOrderDetails/CheckoutOrderDetails';

export const CheckoutPage = (): ReactElement => {
  const { order, removeOrder } = useOrder();
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
            <button
              className={`
              mr-2 mb-2
          flex-1 grow
          rounded-full border
          border-gray-800
          px-5 py-2.5
          text-center text-sm font-medium
          transition
          duration-300
          hover:bg-gray-900 hover:text-white focus:outline-none
          focus:ring-4 focus:ring-gray-300
          `}
              onClick={() => navigate(RouteConstants.MENU)}
            >
              Return to Menu
            </button>
            {localOrder.lineItems?.length > 0 && (
              <button
                type="button"
                className={`
          mr-2 mb-2 flex-1
          rounded-full border
          bg-yellow-300
          px-5 py-2.5 text-center text-sm font-medium
          transition
          duration-300
          hover:bg-black hover:text-white focus:outline-none
          focus:ring-4 focus:ring-yellow-300
          `}
                disabled={false}
                onClick={() => placeOrder}
              >
                Place Order
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
};
