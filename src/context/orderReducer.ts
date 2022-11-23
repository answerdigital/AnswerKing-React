import { OrderCreateDto } from 'dtos/OrderCreateDto';
import { ProductDto } from 'dtos/ProductDto';
import { stringify } from 'querystring';

export enum ActionType {
  Increase = 'ADD_ADDITIONAL_ITEM',
  Decrease = 'DECREASE_ITEM',
}

export type Action = {
  type: ActionType,
  payload: ProductDto
}

export const orderReducer = (state: OrderCreateDto, action: Action): OrderCreateDto => {
  const {type, payload} = action;
  const existingItem = state.lineItems.find((item) => item.product.id === payload.id);
  switch (type) {
  case ActionType.Increase:
    if (!existingItem) {
      return { lineItems: [...state.lineItems, { product: payload, quantity: 1, subTotal: payload.price }]};
    }
    return {
      lineItems: [
        ...state.lineItems.map((item) => {
          if(item.product.id === payload.id){
            const subtotal = item.product.price * item.quantity;
            return {...item, quantity: item.quantity++, subTotal: Math.round(subtotal * 1e2) / 1e2};
          }
          return item;
        })
      ]
    };

  case ActionType.Decrease:
    if (existingItem?.quantity === 0) {
      return {lineItems: [...state.lineItems.filter((item) => item.product.id !== payload.id)]};
    }

    return {
      lineItems: [
        ...state.lineItems.map((item) => {
          if (item.product.id === payload.id) {
            return {
              ...item, quantity: item.quantity-- ,
              subTotal: Math.round((item.subTotal - item.product.price) *  1e2 ) / 1e2
            };
          }
          return item;
        })
      ]
    };
  default:
    return state;
  }
};
