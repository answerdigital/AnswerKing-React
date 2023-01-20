import { OrderCreateForm } from 'components/OrderCreateForm/OrderCreateForm';
import { LocalOrderDetails } from 'components/LocalOrderDetails/LocalOrderDetails';
import { ReactElement } from 'react';
import { OrderType } from 'components/OrderType/OrderType';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from 'utilities/route-constants';

export const OrderPanel = (): ReactElement => {
  const navigate = useNavigate();
  return (
    <>
      <div className="max-h-none container flex max-h-[80%] min-h-[580px] w-[370px] flex-col rounded-xl bg-white py-5 px-5 text-black">
        <OrderType />
        <LocalOrderDetails />
        <OrderCreateForm />
      </div>
      <div className="grid w-[370px] grid-cols-12 py-5 text-sm text-gray-400">
        <button onClick={() => navigate(RouteConstants.HOME)} className="col-span-6 mr-2 rounded-full border border-gray-400 py-2">
          Back to start screen
        </button>
        <button onClick={() => navigate(RouteConstants.ALLERGEN_BOARD)} className="col-span-6 ml-2 rounded-full border border-gray-400 py-2">
          View Allergen board
        </button>
      </div>
    </>
  );
};
