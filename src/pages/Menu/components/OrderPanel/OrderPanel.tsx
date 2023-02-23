import { ReactElement } from 'react';
import { LocalOrderDetails } from '../LocalOrderDetails/LocalOrderDetails';
import { OrderCreateForm } from '../OrderCreateForm/OrderCreateForm';

export const OrderPanel = (): ReactElement => {
  return (
    <>
      <div className="w-[133%] grow">
        <div className="text-ak-grey-1 container relative flex min-h-[63vh] flex-col rounded-xl bg-white py-5 px-5">
          <h1 className="mx-5 mt-2 mb-3 border-b pb-2 text-center text-xl font-semibold">Order Summary</h1>
          <LocalOrderDetails />
          <OrderCreateForm />
        </div>
      </div>
    </>
  );
};
