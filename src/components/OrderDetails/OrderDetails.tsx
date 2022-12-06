import { ReactElement } from 'react';
import { useLocalOrder } from 'context/OrderContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare, faMinusSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';

export const OrderDetails = (): ReactElement => {
  const { localOrder, decreaseProductQuantityOrRemove, increaseProductQuantity } = useLocalOrder();
  return (
    <div>
      <h1 className="mb-7 text-center text-[26px] font-bold">Order Summary</h1>
      <div>
        {localOrder.lineItems?.length > 0 ? (
          localOrder.lineItems.map((lineItem) => (
            <div key={lineItem.product.id} className="text-[16px]">
              <div className="mb-3 mt-3 grid grid-cols-6" key={lineItem.product.id}>
                <div className="col-span-2">
                  <span className="">{lineItem.product.name}</span>
                </div>
                <div className="col-span-3 flex items-center justify-center">
                  <button onClick={() => increaseProductQuantity(lineItem.product)}>
                    <FontAwesomeIcon icon={faPlusSquare} className="h-[22px] w-[22px]" />
                  </button>
                  <span className="mx-3 mb-1">{lineItem.quantity}</span>
                  <button onClick={() => decreaseProductQuantityOrRemove(lineItem.product)}>
                    {lineItem.quantity === 1 ? (
                      <FontAwesomeIcon icon={faTrashCan} className="h-[22px] w-[22px]" />
                    ) : (
                      <FontAwesomeIcon icon={faMinusSquare} className="h-[22px] w-[22px]" />
                    )}
                  </button>
                </div>
                <div className="col-span-1 ml-auto">
                  <span>£{lineItem.subTotal}</span>
                </div>
              </div>
              <hr className="h-[1px]"></hr>
            </div>
          ))
        ) : (
          <p>There are no items in your order.</p>
        )}
      </div>
    </div>
  );
};
