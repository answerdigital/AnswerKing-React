import { OrderItemDto } from './OrderItemDto';

export interface OrderDto {
  id: number;
  status: string;
  address: string;
  total: number;
  items: OrderItemDto[];
}
