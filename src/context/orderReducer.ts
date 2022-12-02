import { LocalOrderDto } from 'dtos/Order/LocalOrderDto';
import { ProductDto } from 'dtos/ProductDto';

export enum ActionType {
  Increase = 'ADD_ADDITIONAL_ITEM',
  Decrease = 'DECREASE_ITEM',
  SetOrderId = 'SET_ORDER_ID',
  RemoveLocalOrder = 'REMOVE_ORDER',
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

  const productPayload = payload.product;
  const orderIdPayload = payload.orderId;

  const existingItem = localOrder.lineItems.find((item) => item.product.id === productPayload?.id);

  switch (type) {
    case ActionType.Increase:
      if (!productPayload) {
        return localOrder;
      }

      if (!existingItem) {
        return {
          ...localOrder,
          lineItems: [...localOrder.lineItems, { product: productPayload, quantity: 1, subTotal: productPayload.price }],
        };
      }

      return {
        ...localOrder,
        lineItems: [
          ...localOrder.lineItems.map((item) => {
            if (item.product.id === productPayload.id) {
              const subtotal = item.product.price * item.quantity;
              return { ...item, quantity: item.quantity++, subTotal: Math.round(subtotal * 1e2) / 1e2 };
            }
            return item;
          }),
        ],
      };

    case ActionType.Decrease:
      if (!productPayload) {
        return localOrder;
      }

      if (existingItem?.quantity === 0) {
        return {
          ...localOrder,
          lineItems: [...localOrder.lineItems.filter((item) => item.product.id !== productPayload.id)],
        };
      }

      return {
        ...localOrder,
        lineItems: [
          ...localOrder.lineItems.map((item) => {
            if (item.product.id === productPayload.id) {
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
      if (!orderIdPayload) {
        return localOrder;
      }

      return { ...localOrder, id: orderIdPayload };

    case ActionType.RemoveLocalOrder:
      return (localOrder = { lineItems: [] });

    default:
      return localOrder;
  }
};
