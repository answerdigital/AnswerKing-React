import { LineItemDto } from './LineItemDto';

export interface OrderCreateDto {
  lineItems: LineItemDto[];
}
