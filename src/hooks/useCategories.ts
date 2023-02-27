import { CategoryDto } from 'dtos/CategoryDto';
import { useQuery, UseQueryResult } from 'react-query';
import CategoryService from 'services/categoryService';

interface UseCategoriesResult {
  categories: UseQueryResult<CategoryDto[]>;
}

export default function useCategories(): UseCategoriesResult {
  const categories = useQuery<CategoryDto[]>(['categories'], CategoryService.getAll);
  return { categories };
}
