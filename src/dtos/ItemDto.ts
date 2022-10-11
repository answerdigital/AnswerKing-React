import { CategoryDto } from './CategoryDto';

export interface ItemDto {
  id: number;
  name: string;
  price: number;
  description?: string;
  categories: CategoryDto[];
}
