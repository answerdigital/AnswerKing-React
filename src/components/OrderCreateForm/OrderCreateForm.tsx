import { Button } from 'components/Button/Button';
import { LoaderOverlay } from 'components/LoaderOverlay/LoaderOverlay';
import { useOrder } from 'hooks/useOrder';
import { FormEvent, ReactElement, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { RouteConstants } from 'utilities/route-constants';
import { CreatedOrderDto } from 'dtos/Order/CreatedOrderDto';
import { useLocalOrder } from 'context/OrderContext';
import { GBPFormat } from 'utilities/GBPFormat';

export const OrderCreateForm = (): ReactElement => {
  const { order, createOrder, updateOrder } = useOrder();
  const { localOrder, setOrderId } = useLocalOrder();
  const navigate = useNavigate();
  const lineItemsExist = localOrder.lineItems?.length > 0;
  const total = localOrder.lineItems.map((item) => item.subTotal).reduce((a, b) => a + b, 0);

  const handleSubmit = (event: FormEvent): void => {
    event.preventDefault();

    const orderLineItems = localOrder.lineItems.map((p) => ({ productId: p.product.id, quantity: p.quantity }));
    const createdOrder: CreatedOrderDto = { lineItems: orderLineItems };

    if (!localOrder.id) {
      createOrder.mutate(createdOrder);
    } else {
      updateOrder.mutate({ id: localOrder.id, updatedOrder: createdOrder });
    }

    navigate(RouteConstants.CHECKOUT);
  };

  useEffect(() => {
    if (!order.data?.id) {
      return;
    }

    setOrderId(order.data.id);
  }, [order.data?.id]);

  return (
    <div className="mt-auto px-2 text-center">
      <hr className="mb-2"></hr>
      {lineItemsExist && (
        <div className="flex w-full justify-between text-[12px] text-[#5A6675]">
          <span className="">Service Charge:</span>
          <span className="">{GBPFormat.format(0.5)}</span>
        </div>
      )}
      <div className="mt-2 mb-2 flex w-full justify-between text-[20px] font-[600] text-[#333F4C]">
        <span>Total:</span>
        <span>{GBPFormat.format(total)}</span>
      </div>
      <form className="mb-1" onSubmit={handleSubmit}>
        <LoaderOverlay isEnabled={createOrder.isLoading} />
        <Button
          disabled={!lineItemsExist}
          size="large"
          className="text-1 font-poppins w-full py-2 px-2 text-sm font-[300] disabled:pointer-events-none disabled:opacity-[0.5]"
          type="submit"
          colour="yellow"
        >
          Go to checkout
        </Button>
      </form>
    </div>
  );
};
