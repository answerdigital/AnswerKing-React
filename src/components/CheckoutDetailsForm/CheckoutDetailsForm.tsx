import { MouseEventHandler, ReactElement, useState } from 'react';
import { RouteConstants } from 'utilities/route-constants';
import { useLocalOrder } from 'context/OrderContext';
import { GBPFormat } from 'utilities/GBPFormat';
import { OrderDetails } from 'components/OrderDetails/OrderDetails';
import { Button } from 'components/Button/Button';
import cn from 'classnames';
import { useNavigate } from 'react-router-dom';
import CheckoutBurgerImg from '../../assets/icon_checkout_no_items.png';

export const CheckoutDetailsForm = (): ReactElement => {
  const { localOrder } = useLocalOrder();
  const [serviceCharge] = useState<number>(0.5);
  const navigate = useNavigate();
  const lineItemsExist = localOrder.lineItems?.length > 0;

  function navigateToMenu(): MouseEventHandler<HTMLElement> {
    return () => {
      navigate(RouteConstants.MENU);
    };
  }

  return (
    <form
      className="mb-10 flex h-[580px] w-[600px] grow flex-col items-center justify-between rounded-[16px] bg-white p-[24px]"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="h-5/6 w-full grow">
        <div>
          <h1 className="mb-4 text-[20px] font-[600] text-[#333F4C]">Confirm Order</h1>
          <hr className="px-1"></hr>
        </div>
        {lineItemsExist && <OrderDetails items={localOrder.lineItems} />}
        <div
          className={cn(
            lineItemsExist ? 'opacity-0' : 'opacity-100',
            'relative translate-y-[50%] transform items-center justify-center text-center text-[14px] font-[400] text-black transition-all duration-300'
          )}
        >
          <img src={CheckoutBurgerImg} className="mx-auto mb-[24px] h-[50px] w-[80px]"></img>
          <p>
            Whoa, you&apos;ve not got <br></br> anything in your order yet
          </p>
          <Button
            colour="yellow"
            size="small"
            onClick={navigateToMenu()}
            className="mt-[24px] h-[41px] w-[131px] cursor-pointer p-[50px] font-[400] leading-[21px]"
          >
            Go to menu
          </Button>
        </div>
      </div>
      <div className="mb-3 w-full text-[22px] transition-all duration-300">
        <hr className="mb-6 px-1"></hr>
        {lineItemsExist ? (
          <div className={cn(lineItemsExist ? 'opacity-100' : 'opacity-0', 'flex w-full justify-between text-[10px] text-[#5A6675]')}>
            <span className="">Service Charge:</span>
            <span className="">{GBPFormat.format(serviceCharge)}</span>
          </div>
        ) : null}
        <div className="mt-2 mb-2 flex w-full justify-between text-[20px] font-[600] text-[#333F4C]">
          <span>Total:</span>
          <span>
            {GBPFormat.format(localOrder.lineItems.reduce((partialSum, a) => partialSum + a.subTotal, 0) + (lineItemsExist ? serviceCharge : 0))}
          </span>
        </div>
      </div>
      <div className="h-6/6 flex w-full font-[400]">
        <Button
          colour="white"
          className="mr-3 h-[45px] w-[120px] rounded-[25px] border border-solid border-[#333F4C] text-[16px]"
          onClick={navigateToMenu()}
        >
          Back
        </Button>
        <Button
          className="h-[45px] w-[416px] rounded-[25px] border-[#FFC600] bg-[#FFC600] text-[16px] disabled:pointer-events-none disabled:opacity-[0.5]"
          disabled={!lineItemsExist}
        >
          Confirm & Continue
        </Button>
      </div>
    </form>
  );
};
