import { OrderCreateDto } from 'dtos/OrderCreateDto';
import { ProductDto } from 'dtos/ProductDto';
import { createContext, useReducer } from 'react';
import { Action, ActionType, orderReducer } from './orderReducer';

const initialState = { lineItems: [] };

interface ILocalOrderHook {
  localOrder: OrderCreateDto;
  increase: (product: ProductDto) => void;
  decrease: (product: ProductDto) => void;
}

interface ILocalOrderContext {
  localOrder: OrderCreateDto;
  dispatch: React.Dispatch<Action>;
}

export const OrderContext = createContext<ILocalOrderContext>({
  localOrder: initialState,
  dispatch: () => null,
});

export const useLocalOrder = (): ILocalOrderHook => {
  const [localOrder, dispatch] = useReducer(orderReducer, initialState);

  const increase = (product: ProductDto): void => dispatch({ type: ActionType.Increase, payload: product });
  const decrease = (product: ProductDto): void => dispatch({ type: ActionType.Decrease, payload: product });

  return { localOrder, increase, decrease };
};

interface Props {
  children: React.ReactNode;
}

export const OrderProvider: React.FC<Props> = ({ children }) => {
  const [localOrder, dispatch] = useReducer(orderReducer, initialState);

  return <OrderContext.Provider value={{ localOrder, dispatch }}>{children}</OrderContext.Provider>;
};
