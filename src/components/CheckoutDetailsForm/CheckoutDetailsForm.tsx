import { MouseEventHandler, ReactElement } from 'react';
import { RouteConstants } from 'utilities/route-constants';
import { useLocalOrder } from 'context/OrderContext';
import { OrderDetails } from 'components/OrderDetails/OrderDetails';
import { Button } from 'components/Buttons/Button';
import { useNavigate } from 'react-router-dom';
import CheckoutBurgerImg from '../../assets/icon_checkout_no_items.png';
import { ComponentTransition } from 'components/Transitions/ComponentTransition';
import { OrderFeesAndTotals } from 'components/OrderFeesAndTotals/OrderFeesAndTotals';

export const CheckoutDetailsForm = (): ReactElement => {
  const { localOrder } = useLocalOrder();
  const navigate = useNavigate();
  const lineItemsExist = localOrder.lineItems?.length > 0;

  function navigateToMenu(): MouseEventHandler<HTMLElement> {
    return () => {
      navigate(RouteConstants.MENU);
    };
  }

  return (
    <form
      className="flex min-h-[65vh] w-[35%] flex-col items-center justify-between rounded-[16px] bg-white p-[24px]"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="container w-full">
        <div>
          <h1 className="mb-4 text-[20px] font-[600] text-[#333F4C]">Confirm Order</h1>
          <hr className="px-1"></hr>
        </div>
        {!lineItemsExist ? (
          <ComponentTransition lineItemsExist={lineItemsExist}>
            <div className="mx-auto translate-y-[50%] items-center justify-center text-center text-[14px] font-[400] text-black">
              <img src={CheckoutBurgerImg} className="mx-auto mb-[4%] h-[50px] w-[80px]"></img>
              <p>
                Whoa, you&apos;ve not got <br></br> anything in your order yet
              </p>
              <Button
                colour="yellow"
                size="small"
                onClick={navigateToMenu()}
                className="mt-[3%] h-[41px] w-[131px] cursor-pointer p-[50px] font-[400] leading-[21px]"
              >
                Go to menu
              </Button>
            </div>
          </ComponentTransition>
        ) : (
          <OrderDetails items={localOrder.lineItems} />
        )}
      </div>

      <OrderFeesAndTotals lineItems={localOrder.lineItems} />

      <div className="flex w-full font-[400]">
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
