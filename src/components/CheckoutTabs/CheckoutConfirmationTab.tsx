import { Button } from 'components/Buttons/Button';
import { CheckoutSection } from 'components/CheckoutSection/CheckoutSection';
import { OrderDetailsMinimal } from 'components/OrderDetails/OrderDetailsMinimal';
import { OrderFeesAndTotals } from 'components/OrderFeesAndTotals/OrderFeesAndTotals';
import { CheckoutTabContext, CheckoutTabType } from 'context/CheckoutTabContext';
import { useLocalOrder } from 'context/OrderContext';
import { useContext } from 'react';
import FoodPrepGif from '../../assets/food-prep.gif';

export const CheckoutConfirmationTab = (): React.ReactElement => {
  const { localOrder } = useLocalOrder();
  const { setCurrentTab } = useContext(CheckoutTabContext);

  const placeholderName = 'Joe Bloggs';
  const placeholderEmail = 'joebloggs@lukewarmmail.com';

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex w-full flex-col items-center justify-center">
        <img src={FoodPrepGif} className="aspect-square w-[150px]"></img>
        <h1 className="mb-4 text-[20px] font-[600] text-[#333F4C]">Order received</h1>
      </div>

      <CheckoutSection title="Order">
        <div className="flex w-full flex-col gap-2">
          <OrderDetailsMinimal items={localOrder.lineItems} />
        </div>
      </CheckoutSection>

      <CheckoutSection title="Order details">
        <div className="flex w-full flex-row justify-between border-b-2 text-[12px]">
          <span>{placeholderName}</span>
          <span>{placeholderEmail}</span>
        </div>
      </CheckoutSection>

      <div className="mt-auto">
        <OrderFeesAndTotals lineItems={localOrder.lineItems} orderComplete={true} />

        <div className="flex w-full gap-5 font-[400]">
          <Button colour="white" size="medium" className="w-full" onClick={() => setCurrentTab(CheckoutTabType.Order)}>
            Order Again
          </Button>
          <Button colour="white" size="medium" className="w-full">
            Contact Restaurant
          </Button>
        </div>
      </div>
    </div>
  );
};
