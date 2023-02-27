import { CreatedOrderDto } from 'dtos/Order/CreatedOrderDto';
import { OrderDto } from 'dtos/Order/OrderDto';
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from 'react-query';
import { ProblemDetails, ItemService } from 'services/itemService';

interface UpdateOrderProps {
  id: number;
  updatedOrder: CreatedOrderDto;
}
interface UseOrderResult {
  order: UseQueryResult<OrderDto>;
  orders: UseQueryResult<OrderDto[]>;
  getOrder: UseMutationResult<OrderDto, ProblemDetails, number>;
  createOrder: UseMutationResult<OrderDto, ProblemDetails, CreatedOrderDto>;
  updateOrder: UseMutationResult<OrderDto, ProblemDetails, UpdateOrderProps>;
  removeOrder: UseMutationResult<void, ProblemDetails, number>;
  clearOrder(): void;
}

export const useOrder = (): UseOrderResult => {
  const orderService = new ItemService<OrderDto,CreatedOrderDto>('orders');

  const queryClient = useQueryClient();

  const order = useQuery<OrderDto>(['order'], { enabled: false });

  const orders = useQuery<OrderDto[]>(['order'], orderService.getAll);

  const getOrder = useMutation<OrderDto, ProblemDetails, number>((id) => orderService.getById(id), {
    onSuccess: (orderDto) => {
      queryClient.setQueryData(['order'], orderDto);
    },
  });

  const createOrder = useMutation<OrderDto, ProblemDetails, CreatedOrderDto>((createdOrderDto) => orderService.create(createdOrderDto), {
    onSuccess: (orderDto) => {
      queryClient.setQueryData(['order'], orderDto);
    },
  });

  const clearOrder = (): Promise<void> => queryClient.resetQueries(['order']);

  const updateOrder = useMutation<OrderDto, ProblemDetails, UpdateOrderProps>((props) => orderService.edit(props.id, props.updatedOrder), {
    onSuccess: (orderResult) => {
      queryClient.setQueryData(['order'], orderResult);
    },
  });

  const removeOrder = useMutation<void, ProblemDetails, number>((id) => orderService.remove(id), {
    onSuccess: () => {
      clearOrder();
    },
  });

  return { order, orders, getOrder, createOrder, clearOrder, updateOrder, removeOrder };
};
