import { ReactElement } from 'react';
import { useLocalOrder } from 'context/OrderContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

export const LocalOrderDetails = (): ReactElement => {
  const { localOrder, decreaseProductQuantityOrRemove } = useLocalOrder();
  return (
    <div>
      <div className="max-h-[17rem] overflow-auto">
        {localOrder.lineItems?.length > 0 ? (
          localOrder.lineItems.map((lineItem) => (
            <div key={lineItem.product.id} className="text-[16px]">
              <div className="mb-3 mt-3 grid grid-cols-12" key={lineItem.product.id}>
                <div className="col-span-1 flex items-center justify-center rounded bg-gray-200 text-sm">{lineItem.quantity}</div>
                <div className="col-span-7 py-1.5 pl-6 text-xs text-gray-700">
                  <span className="">{lineItem.product.name}</span>
                </div>
                <div className="col-span-1 flex items-center justify-center rounded bg-gray-200 text-sm">
                  <button className="h-[27px] w-[27px]" onClick={() => decreaseProductQuantityOrRemove(lineItem.product)}>
                    <FontAwesomeIcon icon={faTrash} className="h-[16px] w-[16px] pt-1 text-gray-700" />
                  </button>
                </div>
                <div className="col-span-2 ml-auto flex items-center justify-center text-xs font-medium">
                  <span>£{(lineItem.subTotal * 1e2) / 1e2}</span>
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
