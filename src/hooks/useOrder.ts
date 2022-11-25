import { CreatedOrderDto } from 'dtos/CreatedOrderDto';
import { OrderDto } from 'dtos/OrderDto';
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from 'react-query';
import { orderService, ProblemDetails } from 'services/orderService';

interface UseOrderResult {
  order: UseQueryResult<OrderDto>;
  getOrder: UseMutationResult<OrderDto, ProblemDetails, number>;
  createOrder: UseMutationResult<OrderDto, ProblemDetails, CreatedOrderDto>;
  clearOrder(): void;
}

export const useOrder = (): UseOrderResult => {
  const queryClient = useQueryClient();

  const order = useQuery<OrderDto>(['order'], { enabled: false });

  const getOrder = useMutation<OrderDto, ProblemDetails, number>((id) => orderService.getById(id), {
    onSuccess: (orderDto) => {
      queryClient.setQueryData(['order'], orderDto);
    },
  });

  const createOrder = useMutation<OrderDto, ProblemDetails, CreatedOrderDto>(
    (CreatedOrderDto) => orderService.create(CreatedOrderDto),
    {
      onSuccess: (orderDto) => {
        queryClient.setQueryData(['order'], orderDto);
      },
    }
  );

  const clearOrder = (): Promise<void> => queryClient.resetQueries(['order']);

  return { order, getOrder, createOrder, clearOrder };
};
