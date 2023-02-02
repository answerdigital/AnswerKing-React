export interface ProductCategoryDto {
  id: number;
  description: string;
  name: string;
}

export interface ProductDto {
  id: number;
  name: string;
  price: number;
  description: string;
  category: ProductCategoryDto;
  retired: boolean;
  tags: number[];
}
