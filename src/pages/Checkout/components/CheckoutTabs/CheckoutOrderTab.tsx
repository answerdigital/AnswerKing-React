import { ReactElement, useContext } from 'react';
import cn from 'classnames';
import Button from 'common/Buttons/Button';
import ComponentTransition from 'common/Transitions/ComponentTransition';
import { CheckoutTabContext, CheckoutTabType } from 'context/CheckoutTabContext';
import { useLocalOrder } from 'context/OrderContext';
import CheckoutBurgerImg from '/images/icon_checkout_no_items.png';
import { useNavigate } from 'react-router-dom';
import PageRoutes from 'utilities/Constants/PageRoutes';
import CheckoutFooter from '../CheckoutFooter/CheckoutFooter';
import OrderDetails from '../OrderDetails/OrderDetails';

export default function CheckoutOrderTab(): ReactElement {
  const { setCurrentTab } = useContext(CheckoutTabContext);
  const navigate = useNavigate();
  const { localOrder } = useLocalOrder();

  const orderExists = localOrder.lineItems?.length > 0;

  return (
    <div className="flex min-h-[65vh] w-full flex-col">
      <h1 className="text-ak-grey-1 m-1 text-xl font-semibold">Order</h1>
      <div className={cn('flex h-full w-full grow flex-col', !orderExists && 'justify-center')}>
        {!orderExists ? (
          <ComponentTransition lineItemsExist={orderExists}>
            <div className="text-ak-grey-1 text-center text-sm font-normal">
              <img src={CheckoutBurgerImg} className="mx-auto mb-[4%] h-[50px] w-[80px]" alt="checkout-burger" />
              <p>
                Whoa, you&apos;ve not got <br /> anything in your order yet
              </p>
              <Button colour="yellow" onClick={() => navigate(PageRoutes.MENU)} className="mt-[3%] h-[45px] w-[130px]">
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
}
