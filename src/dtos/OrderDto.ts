import { LineItemDto } from './LineItemDto';
import { ProductDto } from './ProductDto';

export enum OrderStatus {
  Created = 'Created',
  Complete = 'Complete',
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
