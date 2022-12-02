import { LineItemDto } from 'dtos/LineItemDto';
import { LocalOrderDto } from 'dtos/Order/LocalOrderDto';
import { ProductDto } from 'dtos/ProductDto';
import { createContext, useContext, useReducer } from 'react';
import { ActionType, orderReducer } from './orderReducer';

const initialLineItems: LineItemDto[] = [];
const initialOrder = { lineItems: initialLineItems };

interface ILocalOrder {
  localOrder: LocalOrderDto;
  increase: (product: ProductDto) => void;
  decrease: (product: ProductDto) => void;
  setOrderId: (id: number) => void;
  removeLocalOrder: () => void;
}

const LocalOrderContext = createContext<ILocalOrder>({
  localOrder: { lineItems: initialLineItems },
  increase: () => null,
  decrease: () => null,
  setOrderId: () => null,
  removeLocalOrder: () => null
});

interface Props {
  children: React.ReactNode;
}

export const LocalOrderProvider: React.FC<Props> = ({ children }) => {
  const [localOrder, dispatch] = useReducer(orderReducer, initialOrder);

  const increase = (product: ProductDto): void => {
    dispatch({ type: ActionType.Increase, payload: { product: product } });
  };

  const decrease = (product: ProductDto): void => {
    dispatch({ type: ActionType.Decrease, payload: { product: product } });
  };

  const setOrderId = (id: number): void => {
    dispatch({ type: ActionType.SetOrderId, payload: { orderId: id } });
  };

  const removeLocalOrder = (): void => {
    dispatch({type: ActionType.RemoveLocalOrder, payload: {}});
  };

  return <LocalOrderContext.Provider value={{ localOrder, increase, decrease, setOrderId, removeLocalOrder }}>{children}</LocalOrderContext.Provider>;
};

export const useLocalOrder = (): ILocalOrder => useContext(LocalOrderContext);
