import { LocalOrderDto } from 'dtos/Order/LocalOrderDto';
import { ProductDto } from 'dtos/ProductDto';

export enum ActionType {
  AddToLocalOrder = 'ADD_TO_LOCAL_ORDER',
  IncreaseProductQuantity = 'INCREASE_PRODUCT_QUANTITY',
  DecreaseProductQuantityOrRemove = 'DECREASE_PRODUCT_QUANTITY_OR_REMOVE',
  RemoveProduct = 'REMOVE_PRODUCT',
  SetOrderId = 'SET_ORDER_ID',
  RemoveLocalOrder = 'REMOVE_ORDER',
}

type ActionPayload = {
  product?: ProductDto;
  quantity?: number;
  orderId?: number;
};

export type Action = {
  type: ActionType;
  payload: ActionPayload;
};

export const orderReducer = (localOrder: LocalOrderDto, action: Action): LocalOrderDto => {
  const { type, payload } = action;

  const productPayload = payload.product;
  const lineItemQuantity = payload.quantity;
  const orderIdPayload = payload.orderId;

  const existingItem = localOrder.lineItems.find((item) => item.product.id === productPayload?.id);
  switch (type) {
    case ActionType.AddToLocalOrder:
      if (!productPayload || lineItemQuantity == undefined) {
        return localOrder;
      }

      if (lineItemQuantity === 0) {
        return {
          ...localOrder,
          lineItems: [...localOrder.lineItems.filter((item) => item.product.id !== productPayload.id)],
        };
      }

      if (existingItem) {
        return {
          ...localOrder,
          lineItems: [
            ...localOrder.lineItems.map((item) => {
              if (item.product.id === productPayload.id) {
                return { ...item, quantity: lineItemQuantity, subTotal: Math.round(productPayload.price * lineItemQuantity * 1e2) / 1e2 };
              }
              return item;
            }),
          ],
        };
      }

      return {
        ...localOrder,
        lineItems: [
          ...localOrder.lineItems,
          { product: productPayload, quantity: lineItemQuantity, subTotal: Math.round(productPayload.price * lineItemQuantity * 1e2) / 1e2 },
        ],
      };

    case ActionType.RemoveProduct:
      if (!productPayload) {
        return localOrder;
      }
      return {
        ...localOrder,
        lineItems: [...localOrder.lineItems.filter((item) => item.product.id !== productPayload.id)],
      };

    case ActionType.SetOrderId:
      if (!orderIdPayload) {
        return localOrder;
      }

      return { ...localOrder, id: orderIdPayload };

    case ActionType.RemoveLocalOrder:
      return { lineItems: [] };

    default:
      return localOrder;
  }
};
