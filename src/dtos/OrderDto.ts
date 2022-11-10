import { LineItemDto } from './LineItemDto';

export enum OrderStatus {
  Created = 'Created',
  Paid = 'Paid',
  Cancelled = 'Cancelled',
}

export interface OrderDto {
  id: number;
  createdOn: Date;
  lastUpdated: Date;
  orderStatus: OrderStatus;
  orderTotal: number;
  lineItems: LineItemDto[];
}
