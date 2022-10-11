import { ItemCreateDto } from 'dtos/ItemCreateDto';
import { ItemDto } from 'dtos/ItemDto';
import { useMutation, UseMutationResult, useQuery, UseQueryResult } from 'react-query';
import { itemService } from 'services/itemService';
import { ProblemDetails } from 'services/orderService';

interface UseItemsResult {
  items: UseQueryResult<ItemDto[]>;
  createItem: UseMutationResult<ItemDto, ProblemDetails, ItemCreateDto>;
  removeItem: UseMutationResult<void, ProblemDetails, number>;
}

export const useItems = (): UseItemsResult => {
  const items = useQuery<ItemDto[]>(['items'], itemService.getAll);

  const createItem = useMutation<ItemDto, ProblemDetails, ItemCreateDto>((createDto) => itemService.create(createDto), {
    onSuccess: () => {
      items.refetch();
    },
  });

  const removeItem = useMutation<void, ProblemDetails, number>((id) => itemService.remove(id), {
    onSuccess: () => {
      items.refetch();
    },
  });

  return { items, createItem, removeItem };
};
