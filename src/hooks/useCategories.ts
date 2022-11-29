import { CategoryDto } from 'dtos/CategoryDto';
import { ExtendedProblemDetails } from 'dtos/ProblemDetailsDto';
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import { categoryService } from 'services/categoryService';
import { useProducts } from './useProducts';

type UpdateCategoryArgs = { id: number; category: CategoryDto };

interface UseCategoriesResult {
  categories: UseQueryResult<CategoryDto[]>;
  updateCategory: UseMutationResult<void, ExtendedProblemDetails, UpdateCategoryArgs>;
}

export const useCategories = (): UseCategoriesResult => {
  const categories = useQuery<CategoryDto[]>(['categories'], categoryService.getAll);
  const { products } = useProducts();

  const updateCategory = useMutation<void, ExtendedProblemDetails, UpdateCategoryArgs>(
    ({ id, category }) => categoryService.updateCategory(id, category),
    {
      onSuccess: () => {
        categories.refetch();
        products.refetch();
      },
    }
  );

  return { categories, updateCategory };
};
