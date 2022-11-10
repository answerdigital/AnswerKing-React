import { CategoryDto } from './CategoryDto';

export interface CreatedProductDto {
  name?: string;
  price: number;
  description?: string;
  categories?: CategoryDto[];
}
