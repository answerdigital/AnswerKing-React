import { OrderCreateForm } from 'components/OrderCreateForm/OrderCreateForm';
import { OrderDetails } from 'components/OrderDetails/OrderDetails';
import { ReactElement } from 'react';

export const OrderPanel = (): ReactElement => {
  return (
    <div className="max-h-none container flex max-h-full min-h-[680px] w-[370px] flex-col rounded-xl bg-white py-5 px-5 text-black">
      <OrderDetails />
      <OrderCreateForm />
    </div>
  );
};
