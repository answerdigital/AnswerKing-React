import { LineItemDto } from 'dtos/LineItemDto';
import { CreatedOrderDto } from 'dtos/Order/CreatedOrderDto';
import { LocalOrderDto } from 'dtos/Order/LocalOrderDto';
import { ProductDto } from 'dtos/ProductDto';
import { useOrder } from 'hooks/useOrder';
import { createContext, useContext, useEffect, useReducer } from 'react';
import { ActionType, orderReducer } from './orderReducer';

const initialLineItems: LineItemDto[] = [];
const initialOrder = { lineItems: initialLineItems };

interface ILocalOrder {
  localOrder: LocalOrderDto;
  addToLocalOrder: (product: ProductDto) => void;
  increaseProductQuantity: (product: ProductDto) => void;
  decreaseProductQuantityOrRemove: (product: ProductDto) => void;
  removeProduct: (product: ProductDto) => void;
  setOrderId: (id: number) => void;
  removeLocalOrder: () => void;
}

const LocalOrderContext = createContext<ILocalOrder>({
  localOrder: { lineItems: initialLineItems },
  addToLocalOrder: () => null,
  increaseProductQuantity: () => null,
  decreaseProductQuantityOrRemove: () => null,
  removeProduct: () => null,
  setOrderId: () => null,
  removeLocalOrder: () => null,
});

interface Props {
  children: React.ReactNode;
}

export const LocalOrderProvider: React.FC<Props> = ({ children }) => {
  const [localOrder, dispatch] = useReducer(orderReducer, initialOrder);
  const { updateOrder, createOrder, removeOrder } = useOrder();

  const addToLocalOrder = (product: ProductDto): void => {
    dispatch({ type: ActionType.AddToLocalOrder, payload: { product: product } });
  };

  const increaseProductQuantity = (product: ProductDto): void => {
    dispatch({ type: ActionType.IncreaseProductQuantity, payload: { product: product } });
  };

  const decreaseProductQuantityOrRemove = (product: ProductDto): void => {
    dispatch({ type: ActionType.DecreaseProductQuantityOrRemove, payload: { product: product } });
  };

  const removeProduct = (product: ProductDto): void => {
    dispatch({ type: ActionType.RemoveProduct, payload: { product: product } });
  };

  const setOrderId = (id: number): void => {
    dispatch({ type: ActionType.SetOrderId, payload: { orderId: id } });
  };

  const removeLocalOrder = (): void => {
    dispatch({ type: ActionType.RemoveLocalOrder, payload: {} });
  };

  const handleChange = (): void => {
    console.log('Local Order Changed');
    if (localOrder.lineItems.length) {
      const orderLineItems = localOrder.lineItems.map((p) => ({ productId: p.product.id, quantity: p.quantity }));
      const createdOrder: CreatedOrderDto = { lineItems: orderLineItems };
      if (localOrder.id) {
        updateOrder.mutate({ id: localOrder.id, updatedOrder: createdOrder });
      } else {
        createOrder.mutate(createdOrder);
      }
    } else {
      if (localOrder.id) {
        removeOrder.mutate(localOrder.id);
        localOrder.id = undefined;
      }
    }
  };

  useEffect(() => {
    handleChange();
  }, [localOrder]);

  return (
    <LocalOrderContext.Provider
      value={{ localOrder, addToLocalOrder, increaseProductQuantity, decreaseProductQuantityOrRemove, removeProduct, setOrderId, removeLocalOrder }}
    >
      {children}
    </LocalOrderContext.Provider>
  );
};

export const useLocalOrder = (): ILocalOrder => useContext(LocalOrderContext);
