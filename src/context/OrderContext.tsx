import { createContext, useContext, useMemo, useReducer } from 'react';
import { LineItemDto } from 'dtos/LineItemDto';
import { LocalOrderDto } from 'dtos/Order/LocalOrderDto';
import { ProductDto } from 'dtos/Product/ProductDto';
import { ActionType, orderReducer } from './orderReducer';

const initialLineItems: LineItemDto[] = [];
const initialOrder = { lineItems: initialLineItems };

export interface ILocalOrder {
  localOrder: LocalOrderDto;
  addToLocalOrder: (product: ProductDto, quantity: number) => void;
  removeProduct: (product: ProductDto) => void;
  setOrderId: (id: number) => void;
  removeLocalOrder: () => void;
}

export const LocalOrderContext = createContext<ILocalOrder>({
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

  const orderActions = {
    addToLocalOrder: (product: ProductDto, quantity: number): void => {
      dispatch({ type: ActionType.AddToLocalOrder, payload: { product, quantity } });
    },
    removeProduct: (product: ProductDto): void => {
      dispatch({ type: ActionType.RemoveProduct, payload: { product } });
    },
    setOrderId: (id: number): void => {
      dispatch({ type: ActionType.SetOrderId, payload: { orderId: id } });
    },
    removeLocalOrder: (): void => {
      dispatch({ type: ActionType.RemoveLocalOrder, payload: {} });
    },
  };

  const orderProviderValue = useMemo(() => ({ localOrder, ...orderActions }), [localOrder]);

  return <LocalOrderContext.Provider value={orderProviderValue}>{children}</LocalOrderContext.Provider>;
};

export const useLocalOrder = (): ILocalOrder => useContext(LocalOrderContext);
