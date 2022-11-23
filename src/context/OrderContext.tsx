import { OrderCreateDto } from 'dtos/OrderCreateDto';
import { ProductDto } from 'dtos/ProductDto';
import { createContext, useReducer } from 'react';
import { Action, ActionType, orderReducer } from './orderReducer';

const initialState = { lineItems: [] };

interface ILocalOrderHook {
  state: OrderCreateDto;
  increase: (product: ProductDto) => void;
  decrease: (product: ProductDto) => void;
}

interface ILocalOrderContext {
  state: OrderCreateDto;
  dispatch: React.Dispatch<Action>;
}

export const OrderContext = createContext<ILocalOrderContext>({
  state: initialState,
  dispatch: () => null,
});

export const useLocalOrder = (): ILocalOrderHook => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const increase = (product: ProductDto): void => dispatch({ type: ActionType.Increase, payload: product });
  const decrease = (product: ProductDto): void => dispatch({ type: ActionType.Decrease, payload: product });

  return { state, increase, decrease };
};

interface Props {
  children: React.ReactNode;
}

export const OrderProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  return <OrderContext.Provider value={{ state, dispatch }}>{children}</OrderContext.Provider>;
};
