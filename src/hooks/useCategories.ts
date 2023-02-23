import { CategoryDto } from 'dtos/CategoryDto';
import { CategoryRequestDto } from 'dtos/RequestDtos/CategoryRequestDto';
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import { categoryService } from 'services/categoryService';
import { ProblemDetails } from 'services/orderService';

interface UpdateCategoryProps {
  id: number;
  requestDto: CategoryRequestDto;
}

export interface CategoryProblemDetails extends ProblemDetails {
  errors: Errors;
}

export interface Errors {
  name: string[];
  price: string[];
  description: string[];
}

interface UseCategoriesResult {
  categories: UseQueryResult<CategoryDto[]>;
  createCategory: UseMutationResult<CategoryDto, CategoryProblemDetails, CategoryRequestDto>;
  editCategory: UseMutationResult<CategoryDto, CategoryProblemDetails, UpdateCategoryProps>;
  removeCategory: UseMutationResult<void, CategoryProblemDetails, number>;
}

export const useCategories = (): UseCategoriesResult => {
  const categories = useQuery<CategoryDto[]>(['categories'], categoryService.getAll);

  const createCategory = useMutation<CategoryDto, CategoryProblemDetails, CategoryRequestDto>((requestDto) => categoryService.create(requestDto), {
    onSuccess: () => {
      categories.refetch();
    },
  });

  const editCategory = useMutation<CategoryDto, CategoryProblemDetails, UpdateCategoryProps>((props) => categoryService.edit(props.id, props.requestDto), {
    onSuccess: () => {
      categories.refetch();
    },
  });

  const removeCategory = useMutation<void, CategoryProblemDetails, number>((id) => categoryService.remove(id), {
    onSuccess: () => {
      categories.refetch();
    },
  });

  return { categories, createCategory, editCategory, removeCategory };
};
