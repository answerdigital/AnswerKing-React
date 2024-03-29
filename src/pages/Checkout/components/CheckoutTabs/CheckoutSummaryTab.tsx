import { ReactElement, useContext } from 'react';
import Button from 'common/Buttons/Button';
import { CheckoutTabContext, CheckoutTabType } from 'context/CheckoutTabContext';
import { useLocalOrder } from 'context/OrderContext';
import { CreatedOrderDto } from 'dtos/Order/CreatedOrderDto';
import useOrder from 'hooks/useOrder';
import CheckoutFooter from '../CheckoutFooter/CheckoutFooter';
import CheckoutSection from '../CheckoutSection/CheckoutSection';
import OrderDetailsMinimal from '../OrderDetails/OrderDetailsMinimal';

export default function CheckoutSummaryTab(): ReactElement {
  const { createOrder } = useOrder();
  const { localOrder } = useLocalOrder();
  const { setCurrentTab } = useContext(CheckoutTabContext);

  const orderExists = localOrder.lineItems?.length > 0;
  const placeholderName = 'Joe Bloggs';
  const placeholderEmail = 'joebloggs@lukewarmmail.com';
  const placeholderCard = 'Mastercard **** 1337';

  const submitOrder = (): void => {
    const orderLineItems = localOrder.lineItems.map((p) => ({ productId: p.product.id, quantity: p.quantity }));

    if (orderLineItems.length <= 0) {
      return;
    }

    const createdOrder: CreatedOrderDto = { lineItems: orderLineItems };

    createOrder.mutate(createdOrder, {
      onSuccess: () => {
        setCurrentTab(CheckoutTabType.Confirmation);
      },
    });
  };

  return (
    <div className="flex min-h-[65vh] w-full flex-col">
      <h1 className="mb-4 w-full text-xl font-semibold">Summary</h1>
      <CheckoutSection title="Order" onEditClick={() => setCurrentTab(CheckoutTabType.Order)}>
        <div className="flex w-full flex-col gap-2 border-b-2 px-2 pb-1">
          <OrderDetailsMinimal items={localOrder.lineItems} />
        </div>
      </CheckoutSection>

      <CheckoutSection title="Order details" onEditClick={() => setCurrentTab(CheckoutTabType.PaymentDetails)}>
        <div className="flex w-full flex-col justify-between gap-2 border-b-2 px-2 pb-1 text-xs">
          <span>{placeholderName}</span>
          <span>{placeholderEmail}</span>
        </div>
      </CheckoutSection>

      <CheckoutSection title="Payment details" onEditClick={() => setCurrentTab(CheckoutTabType.PaymentDetails)}>
        <div className="flex justify-between px-2 pb-1 text-xs">
          <span>{placeholderCard}</span>
        </div>
      </CheckoutSection>
      <div className="mt-auto">
        <CheckoutFooter>
          <Button colour="white" className="h-[45px] w-3/12" onClick={() => setCurrentTab(CheckoutTabType.PaymentDetails)}>
            Back
          </Button>
          <Button colour="yellow" className="h-[45px] w-full" onClick={() => submitOrder()} disabled={!orderExists}>
            Place Order
          </Button>
        </CheckoutFooter>
      </div>
    </div>
  );
}
