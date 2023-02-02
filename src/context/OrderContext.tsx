import { LineItemDto } from 'dtos/LineItemDto';
import { LocalOrderDto } from 'dtos/Order/LocalOrderDto';
import { ProductDto } from 'dtos/ProductDto';
import { createContext, useContext, useMemo, useReducer } from 'react';
import { ActionType, orderReducer } from './orderReducer';

const initialLineItems: LineItemDto[] = [];
const initialOrder = { lineItems: initialLineItems };

interface ILocalOrder {
  localOrder: LocalOrderDto;
  addToLocalOrder: (product: ProductDto, quantity: number) => void;
  removeProduct: (product: ProductDto) => void;
  setOrderId: (id: number) => void;
  removeLocalOrder: () => void;
}

const LocalOrderContext = createContext<ILocalOrder>({
  localOrder: { lineItems: initialLineItems },
  addToLocalOrder: () => null,
  removeProduct: () => null,
  setOrderId: () => null,
  removeLocalOrder: () => null,
});

interface Props {
  children: React.ReactNode;
}

export const LocalOrderProvider: React.FC<Props> = ({ children }) => {
  const [localOrder, dispatch] = useReducer(orderReducer, initialOrder);

  const addToLocalOrder = (product: ProductDto, quantity: number): void => {
    dispatch({ type: ActionType.AddToLocalOrder, payload: { product: product, quantity: quantity } });
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

  const orderProvider = useMemo(() => ({ localOrder, addToLocalOrder, removeProduct, setOrderId, removeLocalOrder }), [localOrder]);
  return <LocalOrderContext.Provider value={orderProvider}>{children}</LocalOrderContext.Provider>;
};

export const useLocalOrder = (): ILocalOrder => useContext(LocalOrderContext);
