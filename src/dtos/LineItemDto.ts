import ProductDto from './Product/ProductDto';

export default interface LineItemDto {
  product: ProductDto;
  quantity: number;
  subTotal: number;
}
