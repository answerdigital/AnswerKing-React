import { ProductDto } from 'dtos/ProductDto';
import { CreatedProductDto } from 'dtos/CreatedProductDto';
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import { productService } from 'services/productService';
import { ProblemDetails } from 'services/orderService';

interface UseItemsResult {
  items: UseQueryResult<ProductDto[]>;
  createItem: UseMutationResult<ProductDto, ProblemDetails, CreatedProductDto>;
  removeItem: UseMutationResult<void, ProblemDetails, number>;
}

export const useItems = (): UseItemsResult => {
  const items = useQuery<ProductDto[]>(['items'], productService.getAll);

  const createItem = useMutation<ProductDto, ProblemDetails, CreatedProductDto>(
    (createDto) => productService.create(createDto),
    {
      onSuccess: () => {
        items.refetch();
      },
    }
  );

  const removeItem = useMutation<void, ProblemDetails, number>((id) => productService.remove(id), {
    onSuccess: () => {
      items.refetch();
    },
  });

  return { items, createItem, removeItem };
};
