export interface ProductDto {
  id: number;
  name: string;
  price: number;
  description: string;
  categories?: number[];
  retired: boolean;
}
