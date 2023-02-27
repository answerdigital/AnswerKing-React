import { CreatedOrderDto } from 'dtos/Order/CreatedOrderDto';
import { OrderDto } from 'dtos/Order/OrderDto';
import { ProblemDetails } from 'dtos/ProblemDetails';
import { useMutation, UseMutationResult, useQuery, useQueryClient, UseQueryResult } from 'react-query';
import OrderService from 'services/orderService';

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

export default function useOrder(): UseOrderResult {
  const queryClient = useQueryClient();

  const order = useQuery<OrderDto>(['order'], { enabled: false });

  const orders = useQuery<OrderDto[]>(['order'], OrderService.getAll);

  const getOrder = useMutation<OrderDto, ProblemDetails, number>((id) => OrderService.getById(id), {
    onSuccess: (orderDto) => {
      queryClient.setQueryData(['order'], orderDto);
    },
  });

  const createOrder = useMutation<OrderDto, ProblemDetails, CreatedOrderDto>((createdOrderDto) => OrderService.create(createdOrderDto), {
    onSuccess: (orderDto) => {
      queryClient.setQueryData(['order'], orderDto);
    },
  });

  const clearOrder = (): Promise<void> => queryClient.resetQueries(['order']);

  const updateOrder = useMutation<OrderDto, ProblemDetails, UpdateOrderProps>((props) => OrderService.update(props.id, props.updatedOrder), {
    onSuccess: (orderResult) => {
      queryClient.setQueryData(['order'], orderResult);
    },
  });

  const removeOrder = useMutation<void, ProblemDetails, number>((id) => OrderService.remove(id), {
    onSuccess: () => {
      clearOrder();
    },
  });

  return { order, orders, getOrder, createOrder, clearOrder, updateOrder, removeOrder };
}
