import { LineItemDto } from './LineItemDto';

export interface OrderDto {
  id: number;
  createdOn: Date;
  lastUpdated: Date;
  orderStatus: number;
  orderTotal: number;
  lineItems: LineItemDto[];
}
