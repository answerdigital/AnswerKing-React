import { OrderItemDto } from './OrderItemDto';

export interface OrderCreateDto {
  lineItems: OrderItemDto[];
}
