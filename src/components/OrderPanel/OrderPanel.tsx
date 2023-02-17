import { OrderCreateForm } from 'components/OrderCreateForm/OrderCreateForm';
import { LocalOrderDetails } from 'components/LocalOrderDetails/LocalOrderDetails';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from 'utilities/route-constants';
import { Button } from 'components/Buttons/Button';

export const OrderPanel = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-[133%] grow">
        <div className="container relative flex min-h-[63vh] flex-col rounded-xl bg-white py-5 px-5 text-[#333F4C]">
          <h1 className="mx-5 mt-2 mb-3 border-b pb-2 text-center text-[20px] font-semibold">Order Summary</h1>
          <LocalOrderDetails />
          <OrderCreateForm />
        </div>
      </div>
    </>
  );
};
