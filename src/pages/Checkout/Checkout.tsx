import { CheckoutDetails } from 'components/CheckoutDetails/CheckoutDetails';
import { useOrder } from 'hooks/useOrder';
import { ReactElement, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Button } from 'components/Button/Button';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from 'utilities/route-constants';
import { toast } from 'react-toastify';
import { useLocalOrder } from 'context/OrderContext';
import { CreatedOrderDto } from 'dtos/Order/CreatedOrderDto';

export const CheckoutPage = (): ReactElement => {
  const { order, createOrder, updateOrder, removeOrder } = useOrder();
  const { removeLocalOrder, localOrder } = useLocalOrder();
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
    if (createOrder.isLoading) {
      return;
    }
    const orderLineItems = localOrder.lineItems.map((p) => ({ productId: p.product.id, quantity: p.quantity }));
    const createdOrder: CreatedOrderDto = { lineItems: orderLineItems };

    if (!localOrder.id) {
      createOrder.mutate(createdOrder);
    } else {
      updateOrder.mutate({ id: localOrder.id, updatedOrder: createdOrder });
    }

    //TODO: user should be moved to a payment form
  };

  return (
    <div>
      <Helmet>
        <title>Checkout - Answer King</title>
      </Helmet>
      <form className="flex-auto items-center justify-center bg-slate-100 p-6 text-gray-900" onSubmit={(e) => e.preventDefault()}>
        <div className="checkout text-gray-900">
          {order ? <CheckoutDetails order={order} /> : null}
          {order.isIdle ? <div>No order has been created</div> : null}
        </div>
        <button
          className={`
        mr-2 mb-2
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
          Cancel
        </button>
        <button
          type="button"
          className={`
        mr-2 mb-2
        rounded-full border
        bg-yellow-300
        px-5 py-2.5 text-center text-sm font-medium
        transition
        duration-300
        hover:bg-black hover:text-white focus:outline-none
        focus:ring-4 focus:ring-yellow-300
        `}
          disabled={createOrder.isLoading}
          onClick={() => placeOrder}
        >
          Place Order
        </button>
      </form>
    </div>
  );
};
