import { LineItemDto } from 'dtos/LineItemDto';
import { LocalOrderDto } from 'dtos/LocalOrderDto';
import { ProductDto } from 'dtos/ProductDto';
import { createContext, useContext, useReducer } from 'react';
import { ActionType, orderReducer } from './orderReducer';

const initialLineItems: LineItemDto[] = [];
const initialOrder = { lineItems: initialLineItems };

interface ILocalOrder {
  localOrder: LocalOrderDto;
  increase: (product: ProductDto) => void;
  decrease: (product: ProductDto) => void;
}

export const LocalOrderContext = createContext<ILocalOrder>({
  localOrder: { lineItems: initialLineItems },
  increase: () => null,
  decrease: () => null,
});

export const useLocalOrder = (): ILocalOrder => {
  const [localOrder, dispatch] = useReducer(orderReducer, initialOrder);

  const increase = (product: ProductDto): void => dispatch({ type: ActionType.Increase, payload: product });
  const decrease = (product: ProductDto): void => dispatch({ type: ActionType.Decrease, payload: product });

  return { localOrder, increase, decrease };
};

interface Props {
  children: React.ReactNode;
}

export const LocalOrderProvider: React.FC<Props> = ({ children }) => {
  const { localOrder, increase, decrease } = useLocalOrder();
  return <LocalOrderContext.Provider value={{ localOrder, increase, decrease }}>{children}</LocalOrderContext.Provider>;
};

export const useLocalOrderContext = (): ILocalOrder => useContext(LocalOrderContext);
