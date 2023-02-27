import { LineItemDto } from '../LineItemDto';

export interface LocalOrderDto {
  id?: number;
  lineItems: LineItemDto[];
}
