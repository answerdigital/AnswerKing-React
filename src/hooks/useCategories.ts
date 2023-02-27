import { CategoryDto } from 'dtos/CategoryDto';
import { CategoryRequestDto } from 'dtos/RequestDtos/CategoryRequestDto';
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import { ProblemDetails } from 'dtos/ProblemDetails';
import categoryService from 'services/categoryService';

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

export default function useCategories(): UseCategoriesResult {
  const categories = useQuery<CategoryDto[]>(['categories'], categoryService.getAll);

  const createCategory = useMutation<CategoryDto, categoryProblemDetails, CategoryRequestDto>((requestDto) => categoryService.create(requestDto), {
    onSuccess: () => {
      categories.refetch();
    },
  });

  const editCategory = useMutation<CategoryDto, categoryProblemDetails, UpdateCategoryProps>(
    (props) => categoryService.edit(props.id, props.requestDto),
    {
      onSuccess: () => {
        categories.refetch();
      },
    }
  );

  const removeCategory = useMutation<void, categoryProblemDetails, number>((id) => categoryService.retire(id), {
    onSuccess: () => {
      categories.refetch();
    },
  });

  return { categories, createCategory, editCategory, removeCategory };
}
