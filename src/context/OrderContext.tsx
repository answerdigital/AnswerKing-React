import { LineItemDto } from 'dtos/LineItemDto';
import { LocalOrderDto } from 'dtos/Order/LocalOrderDto';
import { ProductDto } from 'dtos/ProductDto';
import { createContext, useContext, useReducer } from 'react';
import { ActionType, orderReducer } from './orderReducer';

const initialLineItems: LineItemDto[] = [];
const initialOrder = { lineItems: initialLineItems };

interface ILocalOrder {
  localOrder: LocalOrderDto;
  addToLocalOrder: (product: ProductDto) => void;
  increaseProductQuantity: (product: ProductDto) => void;
  decreaseProductQuantityOrRemove: (product: ProductDto) => void;
  setOrderId: (id: number) => void;
  removeLocalOrder: () => void;
}

const LocalOrderContext = createContext<ILocalOrder>({
  localOrder: { lineItems: initialLineItems },
  addToLocalOrder: () => null,
  increaseProductQuantity: () => null,
  decreaseProductQuantityOrRemove: () => null,
  setOrderId: () => null,
  removeLocalOrder: () => null,
});

interface Props {
  children: React.ReactNode;
}

export const LocalOrderProvider: React.FC<Props> = ({ children }) => {
  const [localOrder, dispatch] = useReducer(orderReducer, initialOrder);

  const addToLocalOrder = (product: ProductDto): void => {
    dispatch({ type: ActionType.AddToLocalOrder, payload: { product: product } });
  };

  const increaseProductQuantity = (product: ProductDto): void => {
    dispatch({ type: ActionType.IncreaseProductQuantity, payload: { product: product } });
  };

  const decreaseProductQuantityOrRemove = (product: ProductDto): void => {
    dispatch({ type: ActionType.DecreaseProductQuantityOrRemove, payload: { product: product } });
  };

  const setOrderId = (id: number): void => {
    dispatch({ type: ActionType.SetOrderId, payload: { orderId: id } });
  };

  const removeLocalOrder = (): void => {
    dispatch({ type: ActionType.RemoveLocalOrder, payload: {} });
  };

  return (
    <LocalOrderContext.Provider
      value={{ localOrder, addToLocalOrder, increaseProductQuantity, decreaseProductQuantityOrRemove, setOrderId, removeLocalOrder }}
    >
      {children}
    </LocalOrderContext.Provider>
  );
};

export const useLocalOrder = (): ILocalOrder => useContext(LocalOrderContext);
