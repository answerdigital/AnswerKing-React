import { Button } from 'components/Buttons/Button';
import { CheckoutFooter } from 'components/CheckoutFooter/CheckoutFooter';
import { OrderDetails } from 'components/OrderDetails/OrderDetails';
import { ComponentTransition } from 'components/Transitions/ComponentTransition';
import { CheckoutTabContext, CheckoutTabType } from 'context/CheckoutTabContext';
import { useLocalOrder } from 'context/OrderContext';
import { ReactElement, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from 'utilities/route-constants';
import CheckoutBurgerImg from '../../assets/icon_checkout_no_items.png';
import cn from 'classnames';

export const CheckoutOrderTab = (): ReactElement => {
  const { setCurrentTab } = useContext(CheckoutTabContext);
  const navigate = useNavigate();
  const { localOrder } = useLocalOrder();

  const orderExists = localOrder.lineItems?.length > 0;

  return (
    <div className="flex min-h-[65vh] w-full flex-col">
      <h1 className="text-ak-grey-1 m-1 text-xl font-[600]">Order</h1>
      <div className={cn('flex h-full w-full grow flex-col', !orderExists && 'justify-center')}>
        {!orderExists ? (
          <ComponentTransition lineItemsExist={orderExists}>
            <div className="text-ak-grey-1 text-center text-sm font-[400]">
              <img src={CheckoutBurgerImg} className="mx-auto mb-[4%] h-[50px] w-[80px]"></img>
              <p>
                Whoa, you&apos;ve not got <br></br> anything in your order yet
              </p>
              <Button colour="yellow" onClick={() => navigate(RouteConstants.MENU)} className="mt-[3%] h-[45px] w-[130px]">
                Go to menu
              </Button>
            </div>
          </ComponentTransition>
        ) : (
          <OrderDetails items={localOrder.lineItems} />
        )}
      </div>

      <CheckoutFooter>
        <Button colour="white" className="h-[45px] w-3/12" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Button colour="yellow" className="h-[45px] w-full" onClick={() => setCurrentTab(CheckoutTabType.PaymentDetails)} disabled={!orderExists}>
          Confirm & Continue
        </Button>
      </CheckoutFooter>
    </div>
  );
};
