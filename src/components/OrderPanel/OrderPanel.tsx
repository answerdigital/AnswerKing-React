import { OrderCreateForm } from 'components/OrderCreateForm/OrderCreateForm';
import { OrderDetails } from 'components/OrderDetails/OrderDetails';
import { ReactElement } from 'react';

export const OrderPanel = (): ReactElement => {
  return (
    <div className="container flex flex-col py-5 px-5 bg-white text-black min-h-[680px] max-h-full max-h-none w-[370px] rounded-xl">
      <OrderDetails />
      <OrderCreateForm />
    </div>
  );
};
