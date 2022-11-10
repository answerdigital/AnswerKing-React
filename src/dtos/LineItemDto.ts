import { ProductDto } from './ProductDto';

export interface LineItemDto {
  product: ProductDto;
  quantity: number;
  subTotal: number;
}
