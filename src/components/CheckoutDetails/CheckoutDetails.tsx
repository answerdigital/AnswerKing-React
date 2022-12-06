import { useLocalOrder } from 'context/OrderContext';
import { OrderDto } from 'dtos/Order/OrderDto';
import { ReactElement } from 'react';
import { UseQueryResult } from 'react-query';
interface Props {
  order: UseQueryResult<OrderDto>;
}

export const CheckoutDetails = ({ order }: Props): ReactElement => {
  const buttonClass = `
  rounded-md border
  bg-slate-100
  px-1 py-1
  text-center text-sm font-medium
  focus:ring-4 focus:ring-yellow-300
  `;

  const { decrease, increase } = useLocalOrder();

  return (
    <div>
      <h1 className={'flex-auto text-lg font-semibold text-slate-900'}>Order</h1>
      <div>
        <table className="w-full text-left text-sm">
          <tbody>
            {order.data?.lineItems.map((item) => (
              <tr key={item.product.id} className="border-b bg-white">
                <th>{item.product.name}</th>
                <th>
                  <span>
                    {item.quantity === 1 ? (
                      <button className={buttonClass}>Del</button>
                    ) : (
                      <button className={buttonClass} onClick={() => decrease(item.product)}>
                        -
                      </button>
                    )}
                    {item.quantity}
                    <button className={buttonClass} onClick={() => increase(item.product)}>
                      +
                    </button>
                  </span>
                  <span>£{(item.product.price * item.quantity).toFixed(2)}</span>
                </th>
              </tr>
            ))}
          </tbody>
          {order.data?.lineItems.length === 0 ? <p>There are no items in your order.</p> : null}
        </table>
      </div>

      <div>
        <span>Total:</span>
        <span>£{order.data?.orderTotal}</span>
      </div>
    </div>
  );
};
