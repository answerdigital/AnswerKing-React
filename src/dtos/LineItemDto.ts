import { ProductDto } from './Product/ProductDto';

export interface LineItemDto {
  product: ProductDto;
  quantity: number;
  subTotal: number;
}
