import { OrdersCard } from 'components/OrderCard/OrderCard';
import { OrderDto } from 'dtos/Order/OrderDto';
import { useOrder } from 'hooks/useOrder';
import { ReactElement } from 'react';

export const StaffOrders = (): ReactElement => {
  const { orders } = useOrder();
  const populatedOrders: OrderDto[] = orders.data?.filter((order: OrderDto) => order.lineItems.length) || [];

  return (
    <div className="flex w-[45%] flex-col items-center text-gray-900" key="staff inventory">
      {populatedOrders.length ? (
        populatedOrders.map((order: OrderDto, i) => (
          <div key={order.id} className="w-full">
            <>
              {order.createdOn?.toString().slice(0, 10) !== populatedOrders[i - 1]?.createdOn?.toString().slice(0, 10) && (
                <StaffOrdersDate date={order.createdOn} />
              )}
            </>
            <OrdersCard order={order} />
          </div>
        ))
      ) : (
        <div className="italic text-white">No Orders</div>
      )}
    </div>
  );
};

interface StaffOrdersDateProps {
  date: Date;
}

const StaffOrdersDate = ({ date }: StaffOrdersDateProps): ReactElement => {
  return <div className="my-6 w-full border-b-2 border-gray-300 text-center text-gray-300">{date.toString().slice(0, 10)}</div>;
};
