import { LineItemDto } from 'dtos/LineItemDto';
import { LocalOrderDto } from 'dtos/Order/LocalOrderDto';
import { ProductDto } from 'dtos/ProductDto';
import { createContext, useContext, useReducer } from 'react';
import { ActionType, orderReducer } from './orderReducer';

const initialLineItems: LineItemDto[] = [];
const initialOrder = { lineItems: initialLineItems };

interface ILocalOrder {
  localOrder: LocalOrderDto;
  addToLocalOrder: (product: ProductDto, quantity: number) => void;
  // increaseProductQuantity: (product: ProductDto) => void;
  // decreaseProductQuantityOrRemove: (product: ProductDto) => void;
  removeProduct: (product: ProductDto) => void;
  setOrderId: (id: number) => void;
  removeLocalOrder: () => void;
}

const LocalOrderContext = createContext<ILocalOrder>({
  localOrder: { lineItems: initialLineItems },
  addToLocalOrder: () => null,
  // increaseProductQuantity: () => null,
  // decreaseProductQuantityOrRemove: () => null,
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

  // const increaseProductQuantity = (product: ProductDto): void => {
  //   dispatch({ type: ActionType.IncreaseProductQuantity, payload: { product: product } });
  // };

  // const decreaseProductQuantityOrRemove = (product: ProductDto): void => {
  //   dispatch({ type: ActionType.DecreaseProductQuantityOrRemove, payload: { product: product } });
  // };

  // const checkQuantity = (product: ProductDto) => {
  //   const existingItem = localOrder.lineItems.find((item) => item.product.id === product.id);
  //   const quantity = {existingItem ? existingItem.quantity : 0};
  // };

  const removeProduct = (product: ProductDto): void => {
    dispatch({ type: ActionType.RemoveProduct, payload: { product: product, quantity: 0 } });
  };

  const setOrderId = (id: number): void => {
    dispatch({ type: ActionType.SetOrderId, payload: { orderId: id } });
  };

  const removeLocalOrder = (): void => {
    dispatch({ type: ActionType.RemoveLocalOrder, payload: {} });
  };

  return (
    <LocalOrderContext.Provider value={{ localOrder, addToLocalOrder, removeProduct, setOrderId, removeLocalOrder }}>
      {children}
    </LocalOrderContext.Provider>
  );
};

export const useLocalOrder = (): ILocalOrder => useContext(LocalOrderContext);
