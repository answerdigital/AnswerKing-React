import { ReactElement, useContext } from 'react';
import Button from 'common/Buttons/Button';
import ComponentTransition from 'common/Transitions/ComponentTransition';
import { CheckoutTabContext, CheckoutTabType } from 'context/CheckoutTabContext';
import { useLocalOrder } from 'context/OrderContext';
import CheckoutFooter from 'pages/Checkout/components/CheckoutFooter/CheckoutFooter';
import OrderDetails from 'pages/Checkout/components/OrderDetails/OrderDetails';
import { useNavigate } from 'react-router-dom';
import PageRoutes from 'utilities/Constants/PageRoutes';
import CheckoutBurgerImg from '../../assets/icon_checkout_no_items.png';

export default function CheckoutOrderTab(): ReactElement {
  const { setCurrentTab } = useContext(CheckoutTabContext);
  const navigate = useNavigate();
  const { localOrder } = useLocalOrder();

  const orderExists = localOrder.lineItems?.length > 0;

  return (
    <div className="flex h-full w-full flex-col">
      <div className="w-full">
        <h1 className="mb-4 text-[20px] font-[600] text-[#333F4C]">Order</h1>
      </div>

      {!orderExists ? (
        <ComponentTransition lineItemsExist={orderExists}>
          <div className="mx-auto translate-y-[50%] items-center justify-center text-center text-[14px] font-[400] text-black">
            <img src={CheckoutBurgerImg} className="mx-auto mb-[4%] h-[50px] w-[80px]" alt="checkout-burger" />
            <p>
              Whoa, you&apos;ve not got <br /> anything in your order yet
            </p>
            <Button colour="yellow" onClick={() => navigate(PageRoutes.MENU)} className="mt-[3%] h-[45px] w-[130px] leading-[21px]">
              Go to menu
            </Button>
          </div>
        </ComponentTransition>
      ) : (
        <OrderDetails items={localOrder.lineItems} />
      )}

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
