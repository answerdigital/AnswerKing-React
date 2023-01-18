import { ReactElement } from 'react';
import { RouteConstants } from 'utilities/route-constants';
import { useLocalOrder } from 'context/OrderContext';
import { GBPFormat } from 'utilities/GBPFormat';
import { OrderDetails } from 'components/OrderDetails/OrderDetails';
import { Button } from 'components/Button/Button';
import { useNavigate } from 'react-router-dom';

export const CheckoutDetailsForm = (): ReactElement => {
  const { localOrder } = useLocalOrder();
  const navigate = useNavigate();
  return (
    <form
      className="mb-10 flex h-[580px] w-[600px] grow flex-col items-center justify-between rounded-lg bg-white p-6 text-gray-900"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="h-5/6 w-full grow">
        <h1 className="mb-3 text-2xl font-bold text-[#333F4C]">Order</h1>
        {localOrder.lineItems?.length > 0 ? <OrderDetails items={localOrder.lineItems} /> : <p>Your order is empty.</p>}
      </div>
      <div className="w-full text-[22px] text-[#333F4C] border-t pt-5">
        {localOrder.lineItems?.length > 0 ? (
          <div className="flex w-full justify-between text-[15px] text-[#5A6675]">
            <span className="">Service Charge:</span>
            <span className="">£0.50</span>
          </div>
        ) : (
          <div></div>
        )}
        <div className="mt-2 mb-2 flex w-full justify-between font-bold">
          <span>Total:</span>
          <span>{GBPFormat.format(localOrder.lineItems.reduce((partialSum, a) => partialSum + a.subTotal, 0))}</span>
        </div>
      </div>
      <div className="h-6/6 flex w-full">
        <Button
          colour="white"
          className="border: 1px solid #333F4C mr-3 h-[45px] w-[120px] rounded-[25px] border border-solid border-[#A2AAB6] text-[16px]"
          onClick={() => navigate(RouteConstants.MENU)}
        >
          Back
        </Button>
        <Button className=" h-[45px] w-[416px] rounded-[25px] border-[#FFC600] bg-[#FFC600] text-[16px]">Confirm & Continue</Button>
      </div>
    </form>
  );
};
