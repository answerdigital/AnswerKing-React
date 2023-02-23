import { OrderDto } from 'dtos/Order/OrderDto';
import { useOrder } from 'hooks/useOrder';
import { ReactElement } from 'react';
import { FormatDate } from 'utilities/FormatDate';
import { OrdersCard } from '../OrderCard/OrderCard';

export const StaffOrders = (): ReactElement => {
  const { orders } = useOrder();
  const populatedOrders: OrderDto[] = orders.data?.filter((order: OrderDto) => order.lineItems.length) || [];

  return (
    <div className="font-poppins text-ak-grey-1 flex w-[45%] flex-col items-center font-light" key="staff inventory">
      {populatedOrders.length ? (
        populatedOrders.map((order: OrderDto, i) => (
          <div key={order.id} className="w-full">
            <>
              {order.createdOn.toString().slice(0, 10) !== populatedOrders[i - 1]?.createdOn.toString().slice(0, 10) && (
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
  return <div className="text-ak-grey-3 border-ak-grey-3 my-6 w-full border-b-2 text-center">{FormatDate(date)}</div>;
};
