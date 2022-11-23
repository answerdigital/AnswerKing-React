import { OrderCreateDto } from 'dtos/OrderCreateDto';
import { createContext, useReducer } from 'react';
import { orderReducer } from './orderReducer';

const initialState = { lineItems: [] };

const OrderContext = createContext<{
  state: OrderCreateDto;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

interface Props {
  children: React.ReactNode;
}

const OrderProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  return <OrderContext.Provider value={{ state, dispatch }}>{children}</OrderContext.Provider>;
};

export { OrderContext, OrderProvider };
