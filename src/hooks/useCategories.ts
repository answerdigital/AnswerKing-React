import { CategoryDto } from 'dtos/CategoryDto';
import { CategoryRequestDto } from 'dtos/CategoryRequestDto';
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import { categoryService } from 'services/categoryService';
import { ProblemDetails } from 'services/orderService';

interface UpdateCategoryProps {
  id: number;
  requestDto: CategoryRequestDto;
}

export interface categoryProblemDetails extends ProblemDetails {
  errors: errors;
}

export interface errors {
  name: string[];
  price: string[];
  description: string[];
}

interface UseCategoriesResult {
  categories: UseQueryResult<CategoryDto[]>;
  createCategory: UseMutationResult<CategoryDto, categoryProblemDetails, CategoryRequestDto>;
  editCategory: UseMutationResult<CategoryDto, categoryProblemDetails, UpdateCategoryProps>;
  removeCategory: UseMutationResult<void, ProblemDetails, number>;
}

export const useCategories = (): UseCategoriesResult => {
  const categories = useQuery<CategoryDto[]>(['items'], categoryService.getAll);

  const createCategory = useMutation<CategoryDto, categoryProblemDetails, CategoryRequestDto>((requestDto) => categoryService.create(requestDto), {
    onSuccess: () => {
      categories.refetch();
    },
  });

  const editCategory = useMutation<CategoryDto, categoryProblemDetails, UpdateCategoryProps>((props) => categoryService.edit(props.id, props.requestDto), {
    onSuccess: () => {
      categories.refetch();
    },
  });

  const removeCategory = useMutation<void, categoryProblemDetails, number>((id) => categoryService.remove(id), {
    onSuccess: () => {
      categories.refetch();
    },
  });

  return { categories, createCategory, editCategory, removeCategory };
};
