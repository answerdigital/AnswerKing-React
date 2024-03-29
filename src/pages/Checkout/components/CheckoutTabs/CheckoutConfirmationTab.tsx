import { ReactElement, useContext } from 'react';
import Button from 'common/Buttons/Button';
import OrderFeesAndTotals from 'common/OrderFeesAndTotals/OrderFeesAndTotals';
import { CheckoutTabContext, CheckoutTabType } from 'context/CheckoutTabContext';
import { useLocalOrder } from 'context/OrderContext';
import FoodPrepGif from '/videos/food-prep.gif';
import CheckoutSection from '../CheckoutSection/CheckoutSection';
import OrderDetailsMinimal from '../OrderDetails/OrderDetailsMinimal';

export default function CheckoutConfirmationTab(): ReactElement {
  const { localOrder } = useLocalOrder();
  const { setCurrentTab } = useContext(CheckoutTabContext);

  const placeholderName = 'Joe Bloggs';
  const placeholderEmail = 'joebloggs@lukewarmmail.com';

  return (
    <div className="flex min-h-[65vh] w-full flex-col">
      <div className="flex w-full flex-col items-center justify-center">
        <img src={FoodPrepGif} className="aspect-square w-[150px]" alt="food-prep" />
        <h1 className="text-ak-grey-1 mb-4 text-xl font-semibold">Order received</h1>
      </div>

      <CheckoutSection title="Order">
        <div className="flex w-full flex-col gap-2">
          <OrderDetailsMinimal items={localOrder.lineItems} />
        </div>
      </CheckoutSection>

      <CheckoutSection title="Order details">
        <div className="flex w-full flex-row justify-between text-xs">
          <span>{placeholderName}</span>
          <span>{placeholderEmail}</span>
        </div>
      </CheckoutSection>

      <div className="mt-auto">
        <OrderFeesAndTotals lineItems={localOrder.lineItems} orderComplete />

        <div className="flex w-full gap-5 font-normal">
          <Button colour="white" className="h-[45px] w-full" onClick={() => setCurrentTab(CheckoutTabType.Order)}>
            Order Again
          </Button>
          <Button colour="white" className="h-[45px] w-full">
            Contact Restaurant
          </Button>
        </div>
      </div>
    </div>
  );
}
