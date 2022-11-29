import { LocalOrderDto } from 'dtos/Order/LocalOrderDto';
import { ProductDto } from 'dtos/ProductDto';

export enum ActionType {
  Increase = 'ADD_ADDITIONAL_ITEM',
  Decrease = 'DECREASE_ITEM',
  SetOrderId = 'SET_ORDER_ID',
}

type ActionPayload = {
  product?: ProductDto;
  orderId?: number;
};

export type Action = {
  type: ActionType;
  payload: ActionPayload;
};

export const orderReducer = (localOrder: LocalOrderDto, action: Action): LocalOrderDto => {
  const { type, payload } = action;

  const existingItem = localOrder.lineItems.find((item) => item.product.id === payload.product?.id);

  switch (type) {
    case ActionType.Increase:
      if (!payload.product) {
        return localOrder;
      }

      if (!existingItem) {
        return {
          ...localOrder,
          lineItems: [
            ...localOrder.lineItems,
            { product: payload.product, quantity: 1, subTotal: payload.product.price },
          ],
        };
      }

      return {
        ...localOrder,
        lineItems: [
          ...localOrder.lineItems.map((item) => {
            if (item.product.id === payload.product?.id) {
              const subtotal = item.product.price * item.quantity;
              return { ...item, quantity: item.quantity++, subTotal: Math.round(subtotal * 1e2) / 1e2 };
            }
            return item;
          }),
        ],
      };

    case ActionType.Decrease:
      if (!payload.product) {
        return localOrder;
      }

      if (existingItem?.quantity === 0) {
        return { lineItems: [...localOrder.lineItems.filter((item) => item.product.id !== payload.product?.id)] };
      }

      return {
        ...localOrder,
        lineItems: [
          ...localOrder.lineItems.map((item) => {
            if (item.product.id === payload.product?.id) {
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

    case ActionType.SetOrderId:
      if (!payload.orderId) {
        return localOrder;
      }

      return { ...localOrder, id: payload.orderId };

    default:
      return localOrder;
  }
};
