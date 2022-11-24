import { CategoryDto } from './CategoryDto';

export interface ProductDto {
  id: number;
  name: string;
  price: number;
  description: string;
  categories?: CategoryDto[];
}
