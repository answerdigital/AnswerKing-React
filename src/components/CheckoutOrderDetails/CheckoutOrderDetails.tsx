import { ReactElement } from 'react';
import { useLocalOrder } from 'context/OrderContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import cn from 'classnames';

export const CheckoutOrderDetails = (): ReactElement => {
  const { localOrder, removeProduct } = useLocalOrder();

  const iconClass = `border rounded
  bg-gray-200
  h-[22px] w-[22px]
  px-1 py-1`;

  const binClass = cn(iconClass, 'hover:text-red-700 focus:outline-none');

  return (
    <div className="font-sans text-[16px]">
      <div>
        {localOrder.lineItems?.length > 0 ? (
          localOrder.lineItems.map((lineItem) => (
            <div key={lineItem.product.id}>
              <div className="flex" key={lineItem.product.id}>
                <div className="min-w-[10%] text-center">
                  <span className={iconClass}>{lineItem.quantity}</span>
                </div>
                <div className="grow">
                  <span>{lineItem.product.name}</span>
                </div>
                <div className="min-w-[10%]">
                  <span>£{(lineItem.subTotal * 1e2) / 1e2}</span>
                </div>
                <div className="min-w-[10%]">
                  <button
                    onClick={() => {
                      removeProduct(lineItem.product);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrashCan} className={binClass} />
                  </button>
                </div>
              </div>
              <hr className="h-[1px]"></hr>
            </div>
          ))
        ) : (
          <div className="text-[16px]">
            <p>There are no items in your order.</p>
          </div>
        )}
      </div>
    </div>
  );
};
