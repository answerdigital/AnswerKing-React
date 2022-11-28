interface CreatedLineItems {
  productId: number;
  quantity: number;
}

export interface CreatedOrderDto {
  lineItems: CreatedLineItems[];
}
