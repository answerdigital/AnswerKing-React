import { CategoryDto } from 'dtos/CategoryDto';
import { useQuery, UseQueryResult } from 'react-query';
import { categoryService } from 'services/categoryService';

interface UseCategoriesResult {
  categories: UseQueryResult<CategoryDto[]>;
}

export const useCategories = (): UseCategoriesResult => {
  const categories = useQuery<CategoryDto[]>(['categories'], categoryService.getAll);

  return { categories };
};
