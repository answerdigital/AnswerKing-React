import { LocalOrderDto } from 'dtos/LocalOrderDto';
import { ProductDto } from 'dtos/ProductDto';

export enum ActionType {
  Increase = 'ADD_ADDITIONAL_ITEM',
  Decrease = 'DECREASE_ITEM',
}

export type Action = {
  type: ActionType;
  payload: ProductDto;
};

export const orderReducer = (localOrder: LocalOrderDto, action: Action): LocalOrderDto => {
  const { type, payload } = action;
  const existingItem = localOrder.lineItems.find((item) => item.product.id === payload.id);
  switch (type) {
    case ActionType.Increase:
      if (!existingItem) {
        return { lineItems: [...localOrder.lineItems, { product: payload, quantity: 1, subTotal: payload.price }] };
      }

      return {
        lineItems: [
          ...localOrder.lineItems.map((item) => {
            if (item.product.id === payload.id) {
              const subtotal = item.product.price * item.quantity;
              return { ...item, quantity: item.quantity++, subTotal: Math.round(subtotal * 1e2) / 1e2 };
            }
            return item;
          }),
        ],
      };

    case ActionType.Decrease:
      if (existingItem?.quantity === 0) {
        return { lineItems: [...localOrder.lineItems.filter((item) => item.product.id !== payload.id)] };
      }

      return {
        lineItems: [
          ...localOrder.lineItems.map((item) => {
            if (item.product.id === payload.id) {
              return {
                ...item,
                quantity: item.quantity--,
                subTotal: Math.round((item.subTotal - item.product.price) * 1e2) / 1e2,
              };
            }
            return item;
          }),
        ],
      };

    default:
      return localOrder;
  }
};
