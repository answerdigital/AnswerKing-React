import { CategoryDto } from 'dtos/CategoryDto';
import { useQuery, UseQueryResult } from 'react-query';
import CategoryService from 'services/categoryService';

interface UseCategoriesResult {
  categories: UseQueryResult<CategoryDto[]>;
}

export default function useCategories(filtered = false): UseCategoriesResult {
  const categories = useQuery<CategoryDto[]>(['categories'], CategoryService.getAll, {
    select: (data) => (filtered ? data.filter((category) => !category.retired || (category.products && category.products.length > 0)) : data),
  });

  return { categories };
}
