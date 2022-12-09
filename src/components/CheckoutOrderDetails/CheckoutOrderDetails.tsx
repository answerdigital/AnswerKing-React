import { ReactElement } from 'react';
import { useLocalOrder } from 'context/OrderContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faMinusSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export const CheckoutOrderDetails = (): ReactElement => {
  const { localOrder, decreaseProductQuantityOrRemove, removeProduct, increaseProductQuantity } = useLocalOrder();

  const iconClass = `border rounded
  bg-gray-200
  h-[22px] w-[22px]
  px-1 py-1 `;

  const binClass = iconClass + 'hover:text-red-700 focus:outline-none';

  return (
    <div className="font-sans text-[16px]">
      <div>
        {localOrder.lineItems?.length > 0 ? (
          localOrder.lineItems.map((lineItem) => (
            <div key={lineItem.product.id}>
              <div className="mb-3 mt-3 grid grid-cols-11" key={lineItem.product.id}>
                <div className="col-span-5">
                  <span className="">{lineItem.product.name}</span>
                </div>
                <div className="col-span-3 flex items-center justify-center">
                  <button
                    onClick={() => {
                      increaseProductQuantity(lineItem.product);
                    }}
                  >
                    <FontAwesomeIcon icon={faPlusSquare} className={iconClass} />
                  </button>
                  <span className="mx-3 mb-1">{lineItem.quantity}</span>
                  <button
                    onClick={() => {
                      decreaseProductQuantityOrRemove(lineItem.product);
                    }}
                  >
                    {lineItem.quantity === 1 ? (
                      <FontAwesomeIcon icon={faTrashCan} className={binClass} />
                    ) : (
                      <FontAwesomeIcon icon={faMinusSquare} className={iconClass} />
                    )}
                  </button>
                </div>
                <div className="col-span-2 ml-auto">
                  <span>£{(lineItem.subTotal * 1e2) / 1e2}</span>
                </div>
                <div className="col-span-1 ml-auto">
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
