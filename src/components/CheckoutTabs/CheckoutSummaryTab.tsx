import { Button } from 'components/Buttons/Button';
import { CheckoutFooter } from 'components/CheckoutFooter/CheckoutFooter';
import { CheckoutSection } from 'components/CheckoutSection/CheckoutSection';
import { OrderDetailsMinimal } from 'components/OrderDetails/OrderDetailsMinimal';
import { CheckoutTabContext, CheckoutTabType } from 'context/CheckoutTabContext';
import { useLocalOrder } from 'context/OrderContext';
import { CreatedOrderDto } from 'dtos/Order/CreatedOrderDto';
import { useOrder } from 'hooks/useOrder';
import { useContext } from 'react';
import { GBPFormat } from 'utilities/GBPFormat';
import { SERVICE_CHARGE } from 'utilities/variables';

export const CheckoutSummaryTab = (): React.ReactElement => {
  const { createOrder } = useOrder();
  const { localOrder } = useLocalOrder();
  const { setCurrentTab } = useContext(CheckoutTabContext);

  const orderExists = localOrder.lineItems?.length > 0;

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
    <div className="flex h-full w-full flex-col">
      <h1 className="mb-4 w-full text-[20px] font-[600]">Summary</h1>

      <CheckoutSection title="Order" onEditClick={() => setCurrentTab(CheckoutTabType.Order)}>
        <div className="flex w-full flex-col gap-2">
          <OrderDetailsMinimal items={localOrder.lineItems} />
        </div>
      </CheckoutSection>

      <CheckoutSection title="Order details" onEditClick={() => setCurrentTab(CheckoutTabType.PaymentDetails)}>
        <div className="flex w-full flex-row justify-between border-b-2 text-[12px]">
          <span>Joe Bloggs</span>
          <span>joebloggs@lukewarmmail.com</span>
        </div>
      </CheckoutSection>

      <CheckoutSection title="Payment details" onEditClick={() => setCurrentTab(CheckoutTabType.Order)}>
        <div className="flex justify-between border-b-2 text-[12px]">
          <span>Mastercard **** 1337</span>
          <div className="flex flex-row gap-2">
            <span>Service charge: </span>
            <span className="font-bold">{GBPFormat.format(SERVICE_CHARGE)}</span>
          </div>
        </div>
      </CheckoutSection>

      <CheckoutFooter>
        <Button colour="white" size="medium" className="w-3/12" onClick={() => setCurrentTab(CheckoutTabType.PaymentDetails)}>
          Back
        </Button>
        <Button colour="yellow" size="medium" className="w-full" onClick={() => submitOrder()} disabled={!orderExists}>
          Place Order
        </Button>
      </CheckoutFooter>
    </div>
  );
};
