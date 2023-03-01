import CategoryDto from 'dtos/Category/CategoryDto';
import CategoryProblemDetails from 'dtos/Category/CategoryProblemDetails';
import CategoryRequestDto from 'dtos/Category/CategoryRequestDto';
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import categoryService from 'services/categoryService';

interface UpdateCategoryProps {
  id: number;
  requestDto: CategoryRequestDto;
}

interface UseCategoriesResult {
  categories: UseQueryResult<CategoryDto[]>;
  createCategory: UseMutationResult<CategoryDto, CategoryProblemDetails, CategoryRequestDto>;
  editCategory: UseMutationResult<CategoryDto, CategoryProblemDetails, UpdateCategoryProps>;
  removeCategory: UseMutationResult<void, CategoryProblemDetails, number>;
}

export default function useCategories(filtered = false): UseCategoriesResult {
  const categories = useQuery<CategoryDto[]>([filtered ? 'activeCategories' : 'allCategories'], categoryService.getAll, {
    select: (data) => (filtered ? data.filter((category) => !category.retired || (category.products && category.products.length > 0)) : data),
  });

  const createCategory = useMutation<CategoryDto, CategoryProblemDetails, CategoryRequestDto>((requestDto) => categoryService.create(requestDto), {
    onSuccess: () => {
      categories.refetch();
    },
  });

  const editCategory = useMutation<CategoryDto, CategoryProblemDetails, UpdateCategoryProps>(
    (props) => categoryService.edit(props.id, props.requestDto),
    {
      onSuccess: () => {
        categories.refetch();
      },
    }
  );

  const removeCategory = useMutation<void, CategoryProblemDetails, number>((id) => categoryService.retire(id), {
    onSuccess: () => {
      categories.refetch();
    },
  });

  return { categories, createCategory, editCategory, removeCategory };
}
