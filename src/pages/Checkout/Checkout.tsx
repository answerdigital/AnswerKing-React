import { ReactElement, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from 'utilities/route-constants';
import { useLocalOrder } from 'context/OrderContext';
import { OrderDetails } from 'components/OrderDetails/OrderDetails';

export const CheckoutPage = (): ReactElement => {
  const { localOrder, removeLocalOrder } = useLocalOrder();
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        <title>Checkout - Answer King</title>
      </Helmet>
      <div className="flex flex-col items-center">
        <h1 className="flex h-1/6 items-center text-3xl">Checkout</h1>
        <form
          className="flex h-[618px] w-[600px] flex-col items-center justify-between rounded-lg bg-white p-6 text-gray-900"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="h-5/6 w-full">
            <h1 className="text-2xl font-bold mb-3">Order</h1>
            {localOrder.lineItems?.length > 0 ? <OrderDetails items={localOrder.lineItems} /> : <p>No Items in your order.</p>}
          </div>
          <div className="flex w-full">
            <button
              className="w-[120px] h-[45px] border border-solid border-[#A2AAB6] rounded-[25px] border: 1px solid #333F4C mr-3"
              onClick={() => navigate(RouteConstants.MENU)}
            >
              Go Back
            </button>
            <button className=" w-[416px] h-[45px] bg-[#FFC600] rounded-[25px]">
              Confirm & Continue
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
