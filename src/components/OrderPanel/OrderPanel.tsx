import { OrderCreateForm } from 'components/OrderCreateForm/OrderCreateForm';
import { LocalOrderDetails } from 'components/LocalOrderDetails/LocalOrderDetails';
import { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from 'utilities/route-constants';

export const OrderPanel = (): ReactElement => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-[133%] grow">
        <div className="container relative flex min-h-[63vh] flex-col rounded-xl bg-white py-5 px-5 text-[#333F4C]">
          <h1 className="mx-5 mt-2 mb-3 border-b pb-2 text-center text-xl font-semibold">Order Summary</h1>
          <LocalOrderDetails />
          <OrderCreateForm />
        </div>
        <div className="mt-[4%] grid grid-cols-12 text-sm text-gray-400">
          <button
            onClick={() => navigate(RouteConstants.HOME)}
            className="font-poppins col-span-6 mr-[5px] rounded-full border border-gray-400 py-2 leading-[21px] text-[#A2AAB6]"
          >
            Back to start screen
          </button>
          <button
            onClick={() => navigate(RouteConstants.ALLERGEN_BOARD)}
            className="col-span-6 ml-[5px] rounded-full border border-gray-400 py-2 leading-[21px] text-[#A2AAB6]"
          >
            View Allergen board
          </button>
        </div>
      </div>
    </>
  );
};
